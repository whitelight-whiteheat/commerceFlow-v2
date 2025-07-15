# 🚀 CommerceFlow v2 Deployment Guide

This guide provides comprehensive deployment instructions for CommerceFlow v2, including best practices for production deployment, monitoring, and maintenance.

## 📋 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub
3. **PostgreSQL Database**: Railway will provide this
4. **Node.js 18+**: Ensure compatibility

## 🗄️ Step 1: Database Setup

1. **Create PostgreSQL Service**
   - Go to Railway Dashboard
   - Click "New Service" → "Database" → "PostgreSQL"
   - Note the `DATABASE_URL` from the "Connect" tab

2. **Database Configuration**
   - Railway PostgreSQL includes automatic backups
   - Connection pooling is handled automatically
   - SSL is enabled by default

## 🔧 Step 2: Backend Deployment

1. **Create Backend Service**
   - Click "New Service" → "GitHub Repo"
   - Select your repository
   - Set the **Root Directory** to `backend`

2. **Configure Environment Variables**
   ```bash
   # Required
   DATABASE_URL=your-postgresql-url-from-step-1
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-railway-url.railway.app
   
   # Optional: Stripe (for payments)
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Optional: File Upload (Cloudinary)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
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

4. **Verify Backend Health**
   - Visit: `https://your-backend-url.railway.app/health`
   - Should return: `{"status":"OK","timestamp":"..."}`

## 🎨 Step 3: Frontend Deployment

1. **Create Frontend Service**
   - Click "New Service" → "GitHub Repo"
   - Select the same repository
   - Set the **Root Directory** to `frontend`

2. **Configure Environment Variables**
   ```bash
   VITE_API_URL=https://your-backend-railway-url.railway.app/api
   ```

3. **Deploy**
   - Railway will automatically build and deploy your frontend
   - The build process uses Vite and creates an optimized production build

## 🌐 Step 4: Domain Setup (Optional)

1. **Custom Domain**
   - Go to your service settings
   - Click "Domains"
   - Add your custom domain
   - Update DNS records as instructed

2. **Railway Domains**
   - Each service gets a `.railway.app` domain
   - Update your environment variables with the new URLs

## 🧪 Step 5: Testing & Verification

1. **Backend API Tests**
   ```bash
   # Health check
   curl https://your-backend-url.railway.app/health
   
   # Test authentication
   curl -X POST https://your-backend-url.railway.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@commerceflow.com","password":"admin123"}'
   ```

2. **Frontend Tests**
   - Visit your frontend URL
   - Test login with accounts:
     - Admin: `admin@commerceflow.com` / `admin123`
     - User: `user@commerceflow.com` / `user123`

3. **Feature Testing Checklist**
   - [ ] User registration/login
   - [ ] Product browsing
   - [ ] Cart functionality
   - [ ] Order creation
   - [ ] Review system
   - [ ] Admin dashboard
   - [ ] Image uploads (if configured)

## 🔧 Environment Variables Reference

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
FRONTEND_URL=https://your-frontend-url.railway.app

# Payment Processing (Stripe)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)
```bash
# API Configuration
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 🚨 Troubleshooting Guide

### Common Issues & Solutions

#### 1. Database Connection Failed
**Symptoms**: 500 errors, "Database connection failed" messages
**Solutions**:
```bash
# Check DATABASE_URL format
echo $DATABASE_URL

# Test database connection
railway run npm run db:studio

# Reset database if needed
railway run npm run db:push --force-reset
```

#### 2. Build Failed
**Symptoms**: Deployment fails during build process
**Solutions**:
- Check build logs in Railway dashboard
- Verify all dependencies are in package.json
- Ensure Node.js version compatibility (18+)
- Check for syntax errors in code

#### 3. CORS Errors
**Symptoms**: "Access to fetch at... has been blocked by CORS policy"
**Solutions**:
```bash
# Update FRONTEND_URL in backend environment
FRONTEND_URL=https://your-exact-frontend-url.railway.app

# Ensure URLs match exactly (including https)
# Check for trailing slashes
```

#### 4. Authentication Issues
**Symptoms**: Login fails, tokens not working
**Solutions**:
```bash
# Verify JWT_SECRET is set and strong
echo $JWT_SECRET

# Check token expiration in auth middleware
# Ensure frontend API URL is correct
```

#### 5. Frontend Not Loading
**Symptoms**: White screen, console errors
**Solutions**:
- Check browser console for errors
- Verify VITE_API_URL is correct
- Check if backend is responding
- Clear browser cache

### Debug Commands

```bash
# Check backend logs
railway logs --service backend

# Check frontend logs
railway logs --service frontend

# Check database connection
railway run --service backend npm run db:studio

# Restart services
railway service restart backend
railway service restart frontend

# View environment variables
railway variables --service backend
railway variables --service frontend

# Check service status
railway status
```

### Performance Issues

#### 1. Slow API Responses
**Solutions**:
- Check database query performance
- Implement caching where appropriate
- Monitor Railway resource usage
- Consider database indexing

#### 2. Frontend Loading Issues
**Solutions**:
- Optimize bundle size
- Implement lazy loading
- Use CDN for static assets
- Enable gzip compression

## 📊 Monitoring & Maintenance

### 1. Railway Dashboard Monitoring
- **Service Health**: Monitor uptime and performance
- **Logs**: Real-time log viewing
- **Metrics**: CPU, memory, and network usage
- **Deployments**: Track deployment history

### 2. Health Checks
```bash
# Backend health check
curl https://your-backend-url.railway.app/health

# Expected response
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. Automated Monitoring Setup
```bash
# Set up monitoring alerts
# Configure uptime monitoring
# Set up error tracking (Sentry, etc.)
```

### 4. Regular Maintenance Tasks
- [ ] Weekly: Check service logs for errors
- [ ] Monthly: Review and update dependencies
- [ ] Quarterly: Security audit and updates
- [ ] As needed: Database backups verification

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit secrets to Git
- ✅ Use Railway's secure environment variable storage
- ✅ Rotate secrets regularly (especially JWT_SECRET)
- ✅ Use strong, unique secrets for each environment

### 2. Database Security
- ✅ Railway PostgreSQL is automatically secured
- ✅ Connection strings are encrypted
- ✅ Regular backups included
- ✅ Access is restricted to your services

### 3. Application Security
- ✅ HTTPS is automatically enabled
- ✅ CORS is properly configured
- ✅ Rate limiting is implemented
- ✅ Input validation is in place

### 4. API Security
```bash
# JWT Secret Requirements
- Minimum 32 characters
- Mix of letters, numbers, symbols
- Unique per environment
- Regularly rotated
```

## 💰 Cost Optimization

### 1. Free Tier Usage
- Railway offers generous free tier
- Perfect for development and small projects
- Monitor usage to stay within limits

### 2. Scaling Strategy
- Start with free tier
- Scale up based on actual usage
- Monitor costs regularly
- Use auto-scaling when available

### 3. Resource Optimization
- Optimize database queries
- Implement caching strategies
- Use CDN for static assets
- Monitor and adjust resource allocation

## 🚀 Deployment Best Practices

### 1. Pre-Deployment Checklist
- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Frontend API URL updated
- [ ] Health checks implemented

### 2. Deployment Process
```bash
# 1. Push code to GitHub
git push origin main

# 2. Railway automatically deploys
# 3. Run database migrations
railway run --service backend npm run db:push

# 4. Verify deployment
curl https://your-backend-url.railway.app/health
```

### 3. Rollback Strategy
- Railway provides easy rollback options
- Keep previous deployments as backup
- Test rollback process regularly

## 🔄 CI/CD Integration

### 1. Automated Testing
```yaml
# Example GitHub Actions workflow
name: Test and Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
```

### 2. Automated Deployment
- Railway automatically deploys on push
- Configure branch protection rules
- Set up staging environment

## 📞 Support & Resources

### Documentation
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Prisma Docs**: [prisma.io/docs](https://prisma.io/docs)
- **Express.js Docs**: [expressjs.com](https://expressjs.com)

### Community Support
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: For CommerceFlow-specific issues
- **Stack Overflow**: For general development questions

### Monitoring Tools
- **Railway Dashboard**: Built-in monitoring
- **Sentry**: Error tracking (optional)
- **Uptime Robot**: External monitoring (optional)

---

## 🎯 Quick Reference Commands

```bash
# Development
./start-dev.ps1                    # Start development environment
npm run dev                        # Start backend dev server
cd frontend && npm run dev         # Start frontend dev server

# Database
npm run db:generate                # Generate Prisma client
npm run db:push                    # Push schema to database
npm run db:migrate                 # Run migrations
npm run db:seed                    # Seed database
npm run db:studio                  # Open Prisma Studio

# Deployment
git push origin main              # Deploy to Railway
railway logs                      # View logs
railway variables                 # View environment variables
railway service restart           # Restart service

# Testing
curl https://your-backend-url.railway.app/health  # Health check
```

**Happy Deploying! 🚀** 