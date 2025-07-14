# 🚀 CommerceFlow v2

A modern, full-stack e-commerce platform built with React, Express.js, and PostgreSQL. Deployed on Railway with automatic CI/CD.

## ✨ Features

- **🛍️ Complete E-commerce**: Product catalog, shopping cart, orders, reviews
- **👤 User Management**: Registration, authentication, user profiles
- **🔐 Admin Dashboard**: Product management, order processing, user administration
- **💳 Payment Integration**: Stripe payment processing (optional)
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🚀 Modern Stack**: React 19, Express 5, Prisma ORM, PostgreSQL
- **☁️ Cloud Deployed**: Railway backend, Vercel frontend
- **🔄 Auto Deploy**: Git-based deployment with health checks

## 🏗️ Architecture

```
commerceFlow-v2/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── server.js       # Main server file
│   │   └── seed.js         # Database seeding
│   ├── prisma/             # Database schema & migrations
│   └── railway.json        # Railway deployment config
├── frontend/               # React/Vite application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   └── lib/            # API client & utilities
│   └── vite.config.js      # Vite configuration
└── scripts/                # Development & maintenance scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Railway account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd commerceFlow-v2
   ```

2. **One-command setup** (Windows)
   ```bash
   ./start-dev.ps1
   ```

3. **Manual setup**
   ```bash
   # Backend setup
   cd backend
   cp env.example .env
   npm install
   npm run db:generate
   npm run db:push
   npm run db:seed
   npm run dev

   # Frontend setup (new terminal)
   cd frontend
   echo "VITE_API_URL=http://localhost:5000/api" > .env.local
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health
   - Database GUI: http://localhost:5555 (Prisma Studio)

### Test Accounts
- **Admin**: `admin@commerceflow.com` / `admin123`
- **User**: `user@commerceflow.com` / `user123`

## 🛠️ Development

### Available Scripts

#### Backend
```bash
cd backend
npm run dev          # Start development server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

#### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Maintenance
```bash
./maintenance.ps1 -All              # Run all maintenance tasks
./maintenance.ps1 -UpdateDependencies  # Update packages
./maintenance.ps1 -SecurityAudit    # Security audit
./maintenance.ps1 -HealthCheck      # System health check
```

### Environment Variables

#### Backend (.env)
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

#### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Railway Deployment

1. **Database Setup**
   - Create PostgreSQL service on Railway
   - Copy `DATABASE_URL` to backend environment variables

2. **Backend Deployment**
   - Connect GitHub repository
   - Set root directory to `backend`
   - Configure environment variables
   - Deploy and run database migrations

3. **Frontend Deployment**
   - Connect same repository
   - Set root directory to `frontend`
   - Set `VITE_API_URL` to backend Railway URL
   - Deploy

### Environment Variables for Production

#### Backend (Railway)
```bash
DATABASE_URL=your-railway-postgresql-url
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

#### Frontend (Vercel)
```bash
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- **Backend**: `GET /health`
- **Frontend**: Automatic Railway health checks

### Monitoring Tools
- Railway Dashboard (built-in)
- Application logs via Railway CLI
- Database monitoring via Prisma Studio

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

## 🔒 Security

### Security Features
- ✅ JWT authentication with secure tokens
- ✅ Password hashing with bcrypt
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection (Helmet)
- ✅ HTTPS enforcement

### Security Best Practices
- Use strong JWT secrets (32+ characters)
- Rotate secrets regularly
- Never commit `.env` files
- Keep dependencies updated
- Run security audits regularly

## 🧪 Testing

### API Testing
```bash
# Health check
curl http://localhost:5000/health

# Authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@commerceflow.com","password":"admin123"}'

# Protected routes
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Database Testing
```bash
# Open Prisma Studio
npm run db:studio

# Reset database
npm run db:push --force-reset
npm run db:seed
```

## 🔄 CI/CD Pipeline

### Automated Deployment
1. Push to `main` branch
2. Railway automatically deploys backend
3. Vercel automatically deploys frontend
4. Health checks verify deployment

### Manual Deployment
```bash
# Deploy to Railway
git push origin main

# Check deployment status
railway status

# View logs
railway logs

# Restart services if needed
railway service restart
```

## 🐛 Troubleshooting

### Common Issues

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
- Check build logs in Railway/Vercel
- Verify all dependencies are in package.json
- Check for syntax errors

#### Authentication Issues
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure frontend API URL is correct

### Debug Commands
```bash
# Check service status
railway status

# View environment variables
railway variables

# Check logs
railway logs

# Restart services
railway service restart
```

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Complete deployment instructions
- [Development Guide](DEVELOPMENT.md) - Development workflow and best practices
- [API Documentation](backend/README.md) - Backend API reference

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting
- **Deployment**: Railway

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: Lucide React icons
- **Deployment**: Vercel

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Database GUI**: Prisma Studio
- **Code Quality**: ESLint
- **Build Tool**: Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://prisma.io/docs)
- [React Docs](https://react.dev/)
- [Railway Docs](https://docs.railway.app/)

### Community
- [Railway Discord](https://discord.gg/railway)
- [GitHub Issues](https://github.com/your-repo/issues)
- [Stack Overflow](https://stackoverflow.com/)

### Maintenance
- Run `./maintenance.ps1 -All` for regular maintenance
- Check logs regularly via Railway dashboard
- Monitor health check endpoints
- Keep dependencies updated

---

**Happy Coding! 🚀**

*Built with ❤️ using modern web technologies*
