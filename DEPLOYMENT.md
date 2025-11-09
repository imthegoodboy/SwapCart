# Render Deployment Guide

This guide will help you deploy your SwapCart application to Render.

## Prerequisites

1. GitHub account
2. Render account (free tier available)
3. Your project pushed to a GitHub repository

## Step 1: Prepare Your Repository

1. Make sure all your code is committed and pushed to GitHub
2. Ensure you have the following files in your repository:
   - `render.yaml`
   - `package.json` with proper build scripts
   - `.env.example` (don't commit your actual `.env` file)

## Step 2: Deploy to Render

1. Go to [Render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub account and select your repository
4. Configure your service:
   - **Name**: swapcart-crypto-payment
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run serve`
   - **Instance Type**: Free (or paid if you prefer)

5. Add environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
   GEMINI_API_KEY=your_gemini_api_key
   PORT=8080
   ```

6. Click "Create Web Service"

## Step 3: Wait for Deployment

Render will automatically build and deploy your application. This usually takes 2-5 minutes.

## Step 4: Test Your Deployment

Once deployment is complete, click on your service URL to test the application.

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure your build scripts are correct
- Check the build logs in Render dashboard

### Environment Variables
- Make sure all required environment variables are set
- Check that API keys are valid and active

### Port Issues
- The application should automatically use the port provided by Render
- Check that your `serve` script in `package.json` uses `$PORT`

## Custom Domain (Optional)

1. In your Render dashboard, go to your web service
2. Click "Settings" → "Custom Domains"
3. Add your domain and follow the DNS configuration instructions

## Updates

To update your deployed application:
1. Push changes to your GitHub repository
2. Render will automatically rebuild and deploy

## Support

- Render Documentation: [https://render.com/docs](https://render.com/docs)
- Render Support: [https://render.com/support](https://render.com/support)