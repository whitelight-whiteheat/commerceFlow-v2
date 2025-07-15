cd# 🚨 CommerceFlow v2 Troubleshooting Guide

This guide addresses common issues and their solutions, with a focus on the path-to-regexp error.

## 🚨 Critical Issue: Path-to-Regexp Error

### **Error Message**
```
TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError
    at name (/app/node_modules/path-to-regexp/dist/index.js:73:19)
```

### **Root Cause**
This error occurs when:
1. **Express version incompatibility** with path-to-regexp
2. **Malformed route patterns** with invalid parameter syntax
3. **Route registration conflicts** or middleware issues

### **Solution Steps**

#### Step 1: Downgrade Express (Recommended)
```bash
cd backend
npm install express@4.18.2
npm install
```

#### Step 2: Clear Node Modules and Reinstall
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### Step 3: Test Route Registration
```bash
cd backend
npm run debug-routes
```

#### Step 4: Verify Health Check
```bash
# Test locally
curl http://localhost:5000/health

# Test on Railway
curl https://your-backend-url.railway.app/health
```

### **Alternative Solutions**

#### Option A: Update Express Dependencies
```bash
cd backend
npm update express express-rate-limit
npm install
```

#### Option B: Pin Specific Versions
```bash
cd backend
npm install express@4.18.2 path-to-regexp@6.2.1
npm install
```

## 🔍 Systematic Debugging Process

### **1. Environment Check**
```bash
# Check Node.js version
node --version  # Should be 18+

# Check npm version
npm --version

# Check Express version
npm list express
```

### **2. Route Pattern Validation**
```bash
# Run route debugging script
cd backend
npm run debug-routes
```

### **3. Database Connection Test**
```bash
cd backend
npm run db:generate
npm run db:studio
```

### **4. Local Development Test**
```bash
# Start development server
cd backend
npm run dev

# Test health endpoint
curl http://localhost:5000/health
```

## 🐛 Common Issues & Solutions

### **Issue 1: Path-to-Regexp Error**

#### **Symptoms**
- Server fails to start
- Route registration errors
- Health check failures

#### **Solutions**
1. **Downgrade Express**: `npm install express@4.18.2`
2. **Clear cache**: `rm -rf node_modules package-lock.json && npm install`
3. **Check route patterns**: Ensure all routes use valid parameter syntax

#### **Prevention**
- Use stable Express versions (4.x series)
- Test route patterns before deployment
- Use the debug script: `npm run debug-routes`

### **Issue 2: Database Connection Failed**

#### **Symptoms**
- 500 errors on API calls
- "Database connection failed" messages
- Prisma client generation errors

#### **Solutions**
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npm run db:studio

# Reset database
npm run db:push --force-reset
npm run db:seed
```

### **Issue 3: CORS Errors**

#### **Symptoms**
- "Access to fetch at... has been blocked by CORS policy"
- Frontend can't connect to backend

#### **Solutions**
```bash
# Check FRONTEND_URL in backend .env
echo $FRONTEND_URL

# Ensure URLs match exactly
# Check for trailing slashes
# Verify https vs http
```

### **Issue 4: Authentication Issues**

#### **Symptoms**
- Login fails
- Tokens not working
- 401/403 errors

#### **Solutions**
```bash
# Verify JWT_SECRET
echo $JWT_SECRET

# Check token expiration
# Ensure frontend API URL is correct
```

### **Issue 5: Build Failures**

#### **Symptoms**
- Deployment fails
- Build errors in Railway/Vercel
- Missing dependencies

#### **Solutions**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint

# Verify all dependencies are in package.json
```

## 🔧 Railway-Specific Issues

### **Issue: Health Check Failures**

#### **Symptoms**
- Railway shows service as unhealthy
- Health check endpoint returns errors
- Service restarts repeatedly

#### **Solutions**
1. **Check Railway logs**:
   ```bash
   railway logs --service backend
   ```

2. **Verify health check endpoint**:
   ```bash
   curl https://your-backend-url.railway.app/health
   ```

3. **Check environment variables**:
   ```bash
   railway variables --service backend
   ```

4. **Restart service**:
   ```bash
   railway service restart backend
   ```

### **Issue: Environment Variable Problems**

#### **Solutions**
1. **Verify all required variables**:
   ```bash
   DATABASE_URL=your-postgresql-url
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

2. **Check variable format**:
   - No quotes around values
   - No trailing spaces
   - Correct URL format

### **Issue: Database Migration Failures**

#### **Solutions**
```bash
# Run migrations manually
railway run --service backend npm run db:push

# Seed database
railway run --service backend npm run db:seed

# Check migration status
railway run --service backend npx prisma migrate status
```

## 🚀 Deployment Troubleshooting

### **Pre-Deployment Checklist**
- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Health check endpoint working
- [ ] No syntax errors in code

### **Deployment Process**
```bash
# 1. Commit changes
git add .
git commit -m "fix: resolve path-to-regexp error"

# 2. Push to trigger deployment
git push origin main

# 3. Check deployment status
railway status

# 4. Verify health check
curl https://your-backend-url.railway.app/health

# 5. Run database migrations
railway run --service backend npm run db:push
```

### **Post-Deployment Verification**
```bash
# Test health endpoint
curl https://your-backend-url.railway.app/health

# Test authentication
curl -X POST https://your-backend-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@commerceflow.com","password":"admin123"}'

# Test protected routes
curl -X GET https://your-backend-url.railway.app/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Monitoring & Debugging Tools

### **Railway CLI Commands**
```bash
# View logs
railway logs --service backend

# Check status
railway status

# View variables
railway variables --service backend

# Restart service
railway service restart backend

# Run commands
railway run --service backend npm run db:studio
```

### **Local Debugging Commands**
```bash
# Test routes
npm run debug-routes

# Check database
npm run db:studio

# Test health
curl http://localhost:5000/health

# Check processes
netstat -ano | findstr :5000
```

### **Error Logging**
```bash
# View application logs
railway logs --service backend --follow

# Check for specific errors
railway logs --service backend | grep -i error

# Monitor real-time
railway logs --service backend --tail
```

## 🔒 Security Troubleshooting

### **JWT Issues**
```bash
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update in Railway
railway variables set JWT_SECRET=your-new-secret
```

### **CORS Issues**
```bash
# Check CORS configuration
# Verify FRONTEND_URL matches exactly
# Ensure no trailing slashes
# Check https vs http
```

## 📞 Getting Help

### **When to Seek Help**
- Error persists after trying all solutions
- Unusual error messages
- Performance issues
- Security concerns

### **Information to Provide**
1. **Error message** (exact text)
2. **Environment** (local/Railway)
3. **Steps to reproduce**
4. **Recent changes**
5. **Logs** (if available)

### **Support Channels**
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **GitHub Issues**: For CommerceFlow-specific issues
- **Stack Overflow**: For general development questions

---

**💡 Pro Tip**: Always test changes locally before deploying to production! 