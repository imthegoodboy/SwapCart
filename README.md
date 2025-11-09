# SwapCart - AI-Powered Crypto Payment Gateway

![SwapCart](https://img.shields.io/badge/Crypto-Payment%20Gateway-blue)
![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-purple)

## 🚀 What is SwapCart?

SwapCart is the **first AI-powered cryptocurrency payment gateway** that revolutionizes how merchants accept crypto payments and how customers pay with their preferred cryptocurrency.

### The Problem It Solves

Traditional crypto payment systems force customers to pay with specific tokens, creating friction:
- Customer has Bitcoin but merchant only accepts USDT
- Customer needs to manually swap tokens on an exchange
- High fees, complex process, lost sales

### The SwapCart Solution

**Pay in ANY crypto. Merchant receives their PREFERRED stablecoin. Instantly.**

SwapCart uses AI assistance and the SideShift Pay API to automatically handle token swaps, so:
- ✅ Customers pay with whatever crypto they have (BTC, ETH, SOL, DOGE, etc.)
- ✅ Merchants receive their preferred stablecoin (USDT, USDC, etc.)
- ✅ Zero volatility risk for merchants
- ✅ Maximum convenience for customers
- ✅ AI assistant guides users to the best payment option

---

## 🔥 Key Features

### For Customers
- **100+ Supported Cryptocurrencies**: Pay with BTC, ETH, SOL, DOGE, and more
- **AI Payment Assistant**: Get personalized recommendations for the best crypto to use
- **Instant Swaps**: Automatic token conversion in seconds
- **No Account Required**: Simple checkout process

### For Merchants
- **Zero Volatility Risk**: Always receive stable tokens (USDT/USDC)
- **Instant Settlement**: Payments processed in seconds, not days
- **Real-Time Dashboard**: Track orders and revenue with live updates
- **AI-Powered Checkout**: Increase conversions with smart payment recommendations
- **No Chargebacks**: Crypto payments are final and irreversible

---

## 💡 How It Works

### The Technology Stack

```
Customer (Any Crypto) → AI Assistant → SideShift Pay API → Merchant (Stablecoin)
```

### Step-by-Step Process

1. **Customer Browses Products**
   - Visits the SwapCart demo store
   - Selects products to purchase
   - Clicks "Buy Now"

2. **AI Payment Assistant**
   - Customer opens the checkout modal
   - AI assistant analyzes the purchase and customer preferences
   - Recommends optimal crypto tokens based on:
     - Network fees
     - Transaction speed
     - Token availability
   - Answers questions via conversational chat

3. **Token Selection**
   - Customer chooses from 100+ supported cryptocurrencies
   - Sees real-time conversion rates
   - Understands exactly how much to send

4. **Payment Processing (SideShift Integration)**
   - SwapCart creates an order via Supabase Edge Function
   - SideShift Pay API handles the swap:
     - Generates a unique deposit address for customer's chosen token
     - Monitors blockchain for incoming payment
     - Automatically swaps customer's token to merchant's preferred stablecoin
     - Sends stablecoin to merchant's wallet
   - All in seconds, fully automated

5. **Confirmation & Dashboard**
   - Customer receives payment confirmation
   - Transaction hash displayed
   - Merchant sees order in real-time dashboard
   - Order status updates automatically

---

## 🔗 What is SideShift Pay API?

**SideShift** is a cryptocurrency exchange service that enables instant, non-custodial token swaps without requiring user accounts.

### Why SideShift Powers SwapCart

**SideShift Pay API** provides:
- **100+ Token Support**: BTC, ETH, SOL, USDT, USDC, DOGE, and more
- **Non-Custodial**: No one controls user funds during swaps
- **No KYC Required**: Privacy-focused, instant swaps
- **Fixed-Rate Swaps**: Price locked at order creation
- **Instant Processing**: Swaps complete in seconds
- **API-First Design**: Perfect for payment gateway integration

### How SideShift Integration Works

```javascript
// 1. Create Swap Order via SideShift API
POST https://sideshift.ai/api/v2/shifts
{
  "depositMethod": "btc",      // Customer pays in Bitcoin
  "settleMethod": "usdttrc20",  // Merchant receives USDT (TRC-20)
  "depositAmount": "0.0005",    // Amount customer sends
  "affiliateId": "your-id"      // Your affiliate ID
}

// 2. SideShift Returns
{
  "depositAddress": "bc1q...",  // Customer sends BTC here
  "settleAddress": "TXyz...",   // Merchant receives USDT here
  "depositAmount": "0.0005",
  "settleAmount": "15.42"       // Guaranteed USDT merchant gets
}

// 3. Customer Sends Payment
// → Blockchain transaction to depositAddress

// 4. SideShift Detects Payment
// → Automatically swaps BTC to USDT
// → Sends USDT to merchant's settleAddress

// 5. Merchant Receives Stablecoin
// → Zero volatility exposure
// → Transaction complete
```

### SideShift Advantages for Merchants

| Traditional Payment | SwapCart + SideShift |
|-------------------|---------------------|
| Accept 3-5 tokens max | Accept 100+ tokens |
| Manage multiple wallets | Single stablecoin wallet |
| Expose to volatility | Zero volatility risk |
| Complex accounting | Simple stablecoin accounting |
| Manual token swaps | Automatic swaps |

---

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **React**: Component-based UI
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Responsive, beautiful design
- **shadcn/ui**: Premium UI components
- **React Router**: Multi-page navigation

### Backend (Lovable Cloud + Supabase)
- **Supabase Database**: PostgreSQL for products, orders, chat history
- **Supabase Auth**: User authentication (future feature)
- **Supabase Edge Functions**: Serverless backend logic
  - `create-order`: Processes payments and SideShift integration
  - `chat-assistant`: AI-powered payment recommendations
- **Real-Time Subscriptions**: Live dashboard updates

### AI Integration (Lovable AI)
- **Model**: Google Gemini 2.5 Flash
- **Purpose**: Conversational payment assistant
- **Features**: 
  - Token recommendations
  - Network fee comparisons
  - Payment guidance
  - Customer support

### External APIs
- **SideShift Pay API**: Cryptocurrency swap engine
- **Blockchain Networks**: BTC, ETH, SOL, TRC-20, etc.

---

## 📊 Use Cases

### 1. E-Commerce Merchants
Accept crypto from global customers without volatility risk.

### 2. Freelancers & Service Providers
Get paid in stablecoins while clients pay with any crypto.

### 3. SaaS Platforms
Offer crypto payment option to increase conversions.

### 4. NFT Marketplaces
Accept payments in any token, settle in stablecoins.

### 5. Donation Platforms
Accept crypto donations from any network.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Basic understanding of React and TypeScript

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd swapcart

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with your configuration:

```bash
# Frontend Environment Variables
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key_here
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id_here

# Backend Environment Variables (for Supabase Edge Functions)
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Get your credentials:**
- **Supabase**: Create a free account at [supabase.com](https://supabase.com)
- **Google Gemini**: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **SideShift**: Sign up at [sideshift.ai](https://sideshift.ai) for crypto swap API

### Database Setup

Database tables are already configured:
- `products`: Store inventory
- `orders`: Payment records
- `chat_conversations`: AI chat sessions
- `chat_messages`: Conversation history

---

## 🎯 Project Structure

```
swapcart/
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Landing page hero
│   │   ├── PaymentModal.tsx # Checkout interface
│   │   ├── AIAssistant.tsx  # AI chat widget
│   │   └── ui/             # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx       # Landing page
│   │   ├── Shop.tsx        # Product catalog
│   │   └── Dashboard.tsx   # Merchant dashboard
│   ├── integrations/
│   │   └── supabase/       # Database client
│   └── App.tsx             # App router
├── supabase/
│   ├── functions/
│   │   ├── create-order/   # Payment processing
│   │   └── chat-assistant/ # AI assistant logic
│   └── config.toml         # Supabase config
└── README.md               # You are here!
```

---

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Product catalog
- ✅ AI payment assistant
- ✅ SideShift integration
- ✅ Real-time dashboard
- ✅ Order management

### Phase 2 (Coming Soon)
- 🔄 User authentication
- 🔄 Shopping cart
- 🔄 Real wallet integration (MetaMask)
- 🔄 Email notifications
- 🔄 Analytics charts

### Phase 3 (Future)
- 📋 Merchant admin panel
- 📋 Product inventory management
- 📋 Discount codes
- 📋 Customer reviews
- 📋 Multi-currency pricing

---

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Supabase (Lovable Cloud)
- **Database**: PostgreSQL
- **AI**: Lovable AI (Google Gemini 2.5 Flash)
- **Payment Processing**: SideShift Pay API
- **Blockchain**: Multi-chain support (BTC, ETH, SOL, etc.)

---

## 📦 Deployment

### Deploy with Lovable

1. Open your [Lovable Project](https://lovable.dev/projects/d8f166ea-6555-4b0c-b242-2a158b790fba)
2. Click **Share → Publish**
3. Your app is live instantly!

### Custom Domain

Connect your own domain in Project > Settings > Domains.

Read more: [Custom Domain Setup](https://docs.lovable.dev/features/custom-domain)

---

## 🤝 Contributing

This is an independent project built with modern web technologies. Feel free to fork and customize for your needs!

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 💬 Support

- **Documentation**: [React Documentation](https://react.dev)
- **SideShift API**: [SideShift Docs](https://sideshift.ai/api)
- **Community**: [GitHub Discussions](https://github.com/your-repo/discussions)

---

## 🌟 Why SwapCart Matters

Traditional payment systems exclude billions of people. Credit cards require banks. Banks require documentation. Crypto removes these barriers.

But crypto introduces new friction: "Which token do I need?"

**SwapCart eliminates that friction.**

With AI guidance and instant swaps, anyone can pay with any crypto, and merchants get stablecoins. Simple. Instant. Global.

**The future of payments is here. Welcome to SwapCart.** 🚀

---

Built with ❤️ using modern web technologies
