# 🚀 CommerceFlow v2 Quick Reference

Quick commands and procedures for common development and deployment tasks.

## 🛠️ Development Commands

### Start Development Environment
```bash
# One-command setup (Windows)
./start-dev.ps1

# Manual setup
cd backend && npm install && npm run db:generate && npm run db:push && npm run db:seed && npm run dev
cd frontend && npm install && npm run dev
```

### Backend Commands
```bash
cd backend
npm run dev              # Start development server
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
```

### Frontend Commands
```bash
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

### Maintenance Commands
```bash
./maintenance.ps1 -All              # Run all maintenance tasks
./maintenance.ps1 -UpdateDependencies  # Update packages
./maintenance.ps1 -SecurityAudit    # Security audit
./maintenance.ps1 -HealthCheck      # System health check
```

## 🚀 Deployment Commands

### Railway Deployment
```bash
# Deploy to Railway
git push origin main

# Check deployment status
railway status

# View logs
railway logs --service backend
railway logs --service frontend

# Restart services
railway service restart backend
railway service restart frontend

# View environment variables
railway variables --service backend
railway variables --service frontend
```

### Database Operations
```bash
# Run migrations on Railway
railway run --service backend npm run db:push

# Seed database on Railway
railway run --service backend npm run db:seed

# Reset database (⚠️ destructive)
railway run --service backend npm run db:push --force-reset
```

## 🧪 Testing Commands

### API Testing
```bash
# Health check
curl http://localhost:5000/health
curl https://your-backend-url.railway.app/health

# Authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@commerceflow.com","password":"admin123"}'

# Protected routes
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Frontend Testing
```bash
# Test API connection in browser console
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🔧 Environment Variables

### Backend (.env)
```bash
# Required
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
FRONTEND_URL="http://localhost:5173"

# Optional
PORT=5000
NODE_ENV="development"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:5000/api
```

### Production (Railway Backend)
```bash
DATABASE_URL=your-railway-postgresql-url
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Production (Vercel Frontend)
```bash
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Database Connection Failed
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npm run db:studio

# Reset database
npm run db:push --force-reset
```

#### CORS Errors
- Verify `FRONTEND_URL` in backend environment
- Ensure URLs match exactly (including https)
- Check for trailing slashes

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint
```

#### Authentication Issues
```bash
# Verify JWT_SECRET is set
echo $JWT_SECRET

# Check token expiration
# Ensure frontend API URL is correct
```

#### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID> /F
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- **Backend**: `GET /health`
- **Frontend**: Automatic Railway health checks

### Performance Monitoring
```bash
# Check backend health
curl https://your-backend-url.railway.app/health

# Check frontend
curl https://your-frontend-url.vercel.app

# View logs
railway logs --service backend
railway logs --service frontend
```

## 🔒 Security Commands

### Security Audit
```bash
# Backend security audit
cd backend && npm audit --audit-level moderate

# Frontend security audit
cd frontend && npm audit --audit-level moderate

# Fix vulnerabilities
npm audit fix
```

### JWT Secret Generation
```bash
# Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📦 Package Management

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Update specific package
npm install package-name@latest
```

### Add New Dependencies
```bash
# Backend
cd backend && npm install package-name

# Frontend
cd frontend && npm install package-name

# Development dependencies
npm install --save-dev package-name
```

## 🔄 Git Workflow

### Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Database Changes
```bash
# Update Prisma schema
# Edit backend/prisma/schema.prisma

# Generate migration
npm run db:migrate

# Test migration
npm run db:push

# Update seed data if needed
npm run db:seed
```

## 🎯 Quick Access URLs

### Development
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/health
- Database GUI: http://localhost:5555 (Prisma Studio)

### Production
- Frontend: https://your-frontend-url.vercel.app
- Backend API: https://your-backend-url.railway.app
- Health Check: https://your-backend-url.railway.app/health

### Test Accounts
- **Admin**: `admin@commerceflow.com` / `admin123`
- **User**: `user@commerceflow.com` / `user123`

## 📞 Emergency Contacts

### Documentation
- [Deployment Guide](DEPLOYMENT.md)
- [Development Guide](DEVELOPMENT.md)
- [Railway Docs](https://docs.railway.app/)

### Community Support
- [Railway Discord](https://discord.gg/railway)
- [GitHub Issues](https://github.com/your-repo/issues)

---

**💡 Tip**: Bookmark this page for quick access to common commands! 