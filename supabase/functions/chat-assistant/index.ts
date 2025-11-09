import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, productPrice } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get conversation history
    let messages = [];
    if (conversationId) {
      const { data: history } = await supabase
        .from('chat_messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (history) {
        messages = history.map(m => ({ role: m.role, content: m.content }));
      }
    }

    // Add new user message
    messages.push({ role: 'user', content: message });

    // Call Google Gemini API directly
    const systemPrompt = `You are a helpful crypto payment assistant for SwapCart. 
Help users choose the best cryptocurrency to pay with based on gas fees and conversion rates.
Current product price: $${productPrice || '25'}.

Available payment options:
- BTC (Bitcoin): Low fees, widely accepted
- ETH (Ethereum): Medium fees, fast confirmations  
- SOL (Solana): Very low fees, instant
- USDC (Stablecoin): No conversion needed, stable
- MATIC (Polygon): Very low fees, fast
- DOGE (Dogecoin): Fun option, low fees

Provide specific recommendations and be conversational. Keep responses under 100 words.`;

    // Convert messages to Gemini format
    const geminiMessages = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error('Gemini API error');
    }

    const data = await response.json();
    const assistantMessage = data.candidates[0].content.parts[0].text;

    // Store messages if conversationId provided
    if (conversationId) {
      await supabase.from('chat_messages').insert([
        { conversation_id: conversationId, role: 'user', content: message },
        { conversation_id: conversationId, role: 'assistant', content: assistantMessage }
      ]);
    }

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chat assistant error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
