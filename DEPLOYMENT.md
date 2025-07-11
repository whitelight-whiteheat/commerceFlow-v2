# 🚀 Railway Deployment Guide

This guide will walk you through deploying CommerceFlow v2 to Railway step by step.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub
3. **PostgreSQL Database**: Railway will provide this

## Step 1: Database Setup

1. **Create PostgreSQL Service**
   - Go to Railway Dashboard
   - Click "New Service" → "Database" → "PostgreSQL"
   - Note the `DATABASE_URL` from the "Connect" tab

2. **Copy Database URL**
   - You'll need this for the backend service

## Step 2: Backend Deployment

1. **Create Backend Service**
   - Click "New Service" → "GitHub Repo"
   - Select your repository
   - Set the **Root Directory** to `backend`

2. **Configure Environment Variables**
   ```
   DATABASE_URL=your-postgresql-url-from-step-1
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-railway-url.railway.app
   ```

3. **Deploy and Setup Database**
   - Wait for the first deployment to complete
   - Go to the "Deployments" tab
   - Click on the latest deployment
   - Open the terminal and run:
     ```bash
     npm run db:generate
     npm run db:push
     npm run db:seed
     ```

4. **Note Backend URL**
   - Copy the Railway URL for your backend service
   - You'll need this for the frontend

## Step 3: Frontend Deployment

1. **Create Frontend Service**
   - Click "New Service" → "GitHub Repo"
   - Select the same repository
   - Set the **Root Directory** to `frontend`

2. **Configure Environment Variables**
   ```
   VITE_API_URL=https://your-backend-railway-url.railway.app/api
   ```

3. **Deploy**
   - Railway will automatically build and deploy your frontend
   - The build process uses Vite and creates an optimized production build

## Step 4: Domain Setup (Optional)

1. **Custom Domain**
   - Go to your service settings
   - Click "Domains"
   - Add your custom domain
   - Update DNS records as instructed

2. **Railway Domains**
   - Each service gets a `.railway.app` domain
   - Update your environment variables with the new URLs

## Step 5: Testing

1. **Test Backend API**
   - Visit: `https://your-backend-url.railway.app/health`
   - Should return: `{"status":"OK","timestamp":"..."}`

2. **Test Frontend**
   - Visit your frontend URL
   - Try logging in with test accounts:
     - Admin: `admin@commerceflow.com` / `admin123`
     - User: `user@commerceflow.com` / `user123`

3. **Test Features**
   - Browse products
   - Add items to cart
   - Create orders
   - Leave reviews

## Environment Variables Reference

### Backend (.env)
```bash
# Required
DATABASE_URL=postgresql://...
JWT_SECRET=your-super-secret-key

# Optional
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.railway.app

# Optional: Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend (.env)
```bash
# Required
VITE_API_URL=https://your-backend-url.railway.app/api
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `DATABASE_URL` format
   - Ensure PostgreSQL service is running
   - Verify database migrations ran successfully

2. **Build Failed**
   - Check build logs in Railway
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

3. **CORS Errors**
   - Update `FRONTEND_URL` in backend environment
   - Ensure URLs match exactly (including https)

4. **Authentication Issues**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings
   - Ensure frontend API URL is correct

### Debug Commands

```bash
# Check backend logs
railway logs

# Check database connection
railway run npm run db:studio

# Restart services
railway service restart

# View environment variables
railway variables
```

## Monitoring

1. **Railway Dashboard**
   - Monitor service health
   - View logs in real-time
   - Check resource usage

2. **Health Checks**
   - Backend: `/health` endpoint
   - Frontend: Automatic Railway health checks

3. **Logs**
   - Access logs from Railway dashboard
   - Use `railway logs` CLI command

## Scaling

1. **Automatic Scaling**
   - Railway automatically scales based on traffic
   - No manual configuration needed

2. **Manual Scaling**
   - Go to service settings
   - Adjust CPU and memory allocation
   - Monitor usage patterns

## Security

1. **Environment Variables**
   - Never commit secrets to Git
   - Use Railway's secure environment variable storage
   - Rotate secrets regularly

2. **Database Security**
   - Railway PostgreSQL is automatically secured
   - Connection strings are encrypted
   - Regular backups included

3. **HTTPS**
   - Railway provides automatic HTTPS
   - All traffic is encrypted
   - SSL certificates managed automatically

## Cost Optimization

1. **Free Tier**
   - Railway offers generous free tier
   - Perfect for development and small projects

2. **Paid Plans**
   - Scale up as needed
   - Pay only for what you use
   - No hidden fees

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: For CommerceFlow-specific issues

---

**Happy Deploying! 🚀** 