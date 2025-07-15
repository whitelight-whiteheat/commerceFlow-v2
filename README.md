# 🚀 CommerceFlow v2

A modern, full-stack e-commerce platform built with React 19, Express.js, and PostgreSQL. Deployed on Render (backend) and Vercel (frontend) with automatic CI/CD.

## ✨ Features

- **🛍️ Complete E-commerce**: Product catalog, shopping cart, orders, reviews
- **👤 User Management**: Registration, authentication, user profiles
- **🔐 Admin Dashboard**: Product management, order processing, user administration
- **💳 Payment Integration**: Stripe payment processing (optional)
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🚀 Modern Stack**: React 19, Express 4.18.2, Prisma ORM, PostgreSQL
- **☁️ Cloud Deployed**: Render backend, Vercel frontend
- **🔄 Auto Deploy**: Git-based deployment with health checks
- **⚡ PowerShell Scripts**: Automated development and deployment workflows

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
│   ├── render.yaml         # Render deployment config
│   └── deploy-setup.js     # Deployment automation
├── frontend/               # React/Vite application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   └── lib/            # API client & utilities
│   ├── vercel.json         # Vercel deployment config
│   └── vite.config.js      # Vite configuration
├── scripts/                # PowerShell automation scripts
│   ├── start-dev.ps1       # Development environment setup
│   ├── deploy.ps1          # Deployment automation
│   ├── deploy-easy.ps1     # Simplified deployment
│   ├── maintenance.ps1     # System maintenance tasks
│   └── check-health.ps1    # Health monitoring
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Render account (for backend)
- Vercel account (for frontend)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd commerceFlow-v2
   ```

2. **One-command setup** (Windows PowerShell)
   ```powershell
   ./scripts/start-dev.ps1
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
npm run deploy       # Run deployment setup
```

#### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### PowerShell Scripts
```powershell
./scripts/start-dev.ps1          # Start development environment
./scripts/deploy.ps1             # Deploy to production
./scripts/deploy-easy.ps1        # Simplified deployment
./scripts/maintenance.ps1 -All   # Run all maintenance tasks
./scripts/check-health.ps1       # Check system health
./scripts/test-backend.ps1       # Test backend API
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

### Render + Vercel Deployment

1. **Database Setup**
   - Create PostgreSQL service on Render
   - Copy `DATABASE_URL` to backend environment variables

2. **Backend Deployment (Render)**
   - Connect GitHub repository to Render
   - Set root directory to `backend`
   - Configure environment variables
   - Deploy and run database migrations

3. **Frontend Deployment (Vercel)**
   - Connect same repository to Vercel
   - Set root directory to `frontend`
   - Set `VITE_API_URL` to backend Render URL
   - Deploy

### Environment Variables for Production

#### Backend (Render)
```bash
DATABASE_URL=your-render-postgresql-url
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

#### Frontend (Vercel)
```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- **Backend**: `GET /health`
- **Frontend**: Automatic Vercel health checks

### Monitoring Tools
- Render Dashboard (backend monitoring)
- Vercel Dashboard (frontend monitoring)
- Application logs via Render/Vercel dashboards
- Database monitoring via Prisma Studio

### Performance Monitoring
```bash
# Check backend health
curl https://your-backend-url.onrender.com/health

# Check frontend
curl https://your-frontend-url.vercel.app

# View logs (Render)
render logs --service commerceflow-backend

# View logs (Vercel)
vercel logs
```

## 🔒 Security

### Security Features
- ✅ JWT authentication with secure tokens
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Rate limiting with express-rate-limit
- ✅ Input validation with express-validator
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

### Automated Testing
```powershell
# Test backend health
./scripts/test-backend.ps1

# Check system health
./scripts/check-health.ps1
```

## 🔄 CI/CD Pipeline

### Automated Deployment
1. Push to `main` branch
2. Render automatically deploys backend
3. Vercel automatically deploys frontend
4. Health checks verify deployment

### Manual Deployment
```powershell
# Deploy using PowerShell script
./scripts/deploy.ps1

# Or simplified deployment
./scripts/deploy-easy.ps1
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
- Check build logs in Render/Vercel dashboards
- Verify all dependencies are in package.json
- Check for syntax errors

#### Authentication Issues
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure frontend API URL is correct

### Debug Commands
```powershell
# Check system health
./scripts/check-health.ps1

# Test backend API
./scripts/test-backend.ps1

# Run maintenance tasks
./scripts/maintenance.ps1 -All
```

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Complete deployment instructions
- [Development Guide](docs/DEVELOPMENT.md) - Development workflow and best practices
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md) - Common issues and solutions
- [Portfolio Showcase](docs/PORTFOLIO_SHOWCASE.md) - Project highlights and features

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Database**: PostgreSQL with Prisma ORM 6.11.1
- **Authentication**: JWT with bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting
- **Deployment**: Render

### Frontend
- **Framework**: React 19.1.0 with Vite 7.0.4
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Zustand 5.0.2
- **HTTP Client**: Axios 1.7.9
- **UI Components**: Lucide React icons
- **Deployment**: Vercel

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Database GUI**: Prisma Studio
- **Code Quality**: ESLint 9.30.1
- **Build Tool**: Vite
- **Automation**: PowerShell scripts

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
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Community
- [Render Discord](https://discord.gg/render)
- [Vercel Discord](https://discord.gg/vercel)
- [GitHub Issues](https://github.com/your-repo/issues)
- [Stack Overflow](https://stackoverflow.com/)

### Maintenance
- Run `./scripts/maintenance.ps1 -All` for regular maintenance
- Check logs regularly via Render/Vercel dashboards
- Monitor health check endpoints
- Keep dependencies updated

---

**Happy Coding! 🚀**

*Built with ❤️ using modern web technologies*
