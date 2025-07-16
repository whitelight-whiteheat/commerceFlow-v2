# Environment Configuration Guide

This guide explains how to set up environment variables for both local development and production deployment.

## 🏠 Local Development

### Quick Setup
```bash
npm run env:setup
```

This creates a `.env.local` file with:
```
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### Manual Setup
1. Create a `.env.local` file in the frontend directory
2. Add the following content:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

## 🚀 Production (Vercel)

### Vercel Dashboard Setup
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `VITE_API_URL`: Your production backend URL (e.g., `https://your-backend.onrender.com/api`)
   - `VITE_ENV`: `production`

### Example Production Environment
```env
VITE_API_URL=https://commerceflow-v2.onrender.com/api
VITE_ENV=production
```

## 🔧 Environment Priority

Vite loads environment variables in this order (highest priority first):
1. `.env.local` (local development)
2. `.env.development` (development mode)
3. `.env.production` (production mode)
4. `.env` (fallback)

## 📋 Available Commands

```bash
# Setup local environment
npm run env:setup

# Check current environment
npm run env:check

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔍 Environment Detection

The app automatically detects the environment:
- **Development**: Uses `http://localhost:5000/api`
- **Production**: Uses the URL set in Vercel environment variables

## 🛠️ Troubleshooting

### Common Issues

1. **API calls failing locally**
   - Check if `.env.local` exists
   - Verify `VITE_API_URL=http://localhost:5000/api`
   - Ensure backend is running on port 5000

2. **API calls failing in production**
   - Check Vercel environment variables
   - Verify backend URL is correct and accessible
   - Check CORS settings on backend

3. **Environment not updating**
   - Restart the development server
   - Clear browser cache
   - Check for typos in environment variable names

### Debug Commands
```bash
# Check environment variables
npm run env:check

# View current API URL in browser console
# (Check the console logs when the app loads)
```

## 📝 Notes

- `.env.local` is automatically ignored by Git
- Environment variables must start with `VITE_` to be accessible in the frontend
- Changes to environment variables require a server restart in development 