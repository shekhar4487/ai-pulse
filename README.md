
# AI Pulse Deployment & Monetization Guide

This project is a high-performance AI News & Tool Directory inspired by The Rundown AI. It is built with React, Tailwind CSS, and Google Gemini.

## 🚀 Quick Deployment (Vercel)

1. **Push to GitHub**: Initialize a git repo and push your code.
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Import your GitHub repository.
3. **Environment Variables**:
   - In the Vercel dashboard, go to **Settings > Environment Variables**.
   - Add a new key: `API_KEY`.
   - Paste your **Google Gemini API Key** as the value.
4. **Deploy**: Click **"Deploy"**. Vercel will automatically detect the Vite configuration and build your site.

## 💰 Monetization Strategy

The application is already architected for three primary revenue streams:

### 1. Sponsored Content (Native Ads)
- **Implementation**: The `NewsItem` and `AITool` types include an `is_sponsored` flag.
- **Action**: Sell "Featured Tool of the Week" slots or "Sponsored News Breaks." Use the Admin Console to flag these items, and they will automatically appear with premium styling and badges.

### 2. Premium Newsletter / Membership
- **Implementation**: The "Courses" and "Premium" views are designed to capture leads via Supabase.
- **Action**: Integrate a payment gateway like **Stripe**. When a user subscribes, send them to a Stripe Checkout page. Upon successful payment, flag their email in your Supabase `subscribers` table as `is_premium: true` to unlock deep-dive content.

### 3. Lead Generation (Affiliate Marketing)
- **Implementation**: Every tool in the directory has a `link` property.
- **Action**: Sign up for affiliate programs (e.g., Cursor, Jasper, Midjourney). Replace the standard links in your database with your affiliate URLs to earn commissions on signups.

## 🛠 Tech Stack
- **Frontend**: React 19 (ESM)
- **Styling**: Tailwind CSS
- **AI Logic**: Google Gemini (via `@google/genai`)
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite

## 📈 Next Steps
- **Custom Domain**: Connect a professional `.ai` or `.com` domain.
- **SEO**: Update the `index.html` meta tags with your actual brand name.
- **Content**: Use the **Admin Management Console** to replace mock data with real daily AI updates.
