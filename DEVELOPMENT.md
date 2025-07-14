# 🛠️ CommerceFlow v2 Development Guide

This guide covers the complete development workflow for CommerceFlow v2, including local development, testing, debugging, and best practices.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- PostgreSQL (local or Railway)

### One-Command Setup
```bash
# Windows PowerShell
./start-dev.ps1

# Manual setup (if script fails)
cd backend && npm install && npm run db:generate && npm run db:push
cd ../frontend && npm install
```

## 📁 Project Structure

```
commerceFlow-v2/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── server.js       # Main server file
│   │   └── seed.js         # Database seeding
│   ├── prisma/             # Database schema & migrations
│   ├── package.json        # Backend dependencies
│   └── railway.json        # Railway deployment config
├── frontend/               # React/Vite application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand state management
│   │   ├── lib/            # Utilities & API client
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
└── start-dev.ps1           # Development startup script
```

## 🔧 Development Environment

### Backend Development

#### 1. Environment Setup
```bash
cd backend

# Copy environment template
cp env.example .env

# Edit .env with your configuration
# Required variables:
DATABASE_URL="postgresql://username:password@localhost:5432/commerceflow"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
FRONTEND_URL="http://localhost:5173"
```

#### 2. Database Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with test data
npm run db:seed
```

#### 3. Start Development Server
```bash
# Start with nodemon (auto-restart on changes)
npm run dev

# Or start without nodemon
npm start
```

#### 4. Database Management
```bash
# Open Prisma Studio (database GUI)
npm run db:studio

# Run migrations
npm run db:migrate

# Reset database (⚠️ destructive)
npm run db:push --force-reset
```

### Frontend Development

#### 1. Environment Setup
```bash
cd frontend

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm run dev
```

#### 4. Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

## 🧪 Testing

### Backend Testing

#### 1. Manual API Testing
```bash
# Health check
curl http://localhost:5000/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@commerceflow.com","password":"admin123"}'

# Test protected routes
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 2. Database Testing
```bash
# Test database connection
npm run db:studio

# Check migrations
npx prisma migrate status

# Reset and reseed
npm run db:push --force-reset
npm run db:seed
```

### Frontend Testing

#### 1. Browser Testing
- Open http://localhost:5173
- Test all user flows
- Check browser console for errors
- Test responsive design

#### 2. API Integration Testing
```javascript
// Test API connection in browser console
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🐛 Debugging

### Backend Debugging

#### 1. Logging
```javascript
// Add debug logs
console.log('Debug:', { variable, data });
console.error('Error:', error);

// Use environment-specific logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

#### 2. Database Debugging
```bash
# Check database connection
npm run db:studio

# View migration history
npx prisma migrate status

# Check schema
npx prisma format
```

#### 3. API Debugging
```bash
# Test specific endpoints
curl -v http://localhost:5000/api/products

# Check CORS issues
curl -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS http://localhost:5000/api/auth/login
```

### Frontend Debugging

#### 1. React DevTools
- Install React Developer Tools browser extension
- Inspect component state and props
- Monitor re-renders

#### 2. Network Debugging
```javascript
// Check API calls in browser console
// Monitor Network tab in DevTools
// Check for CORS errors
```

#### 3. State Debugging
```javascript
// Debug Zustand stores
import { useAuthStore } from './stores/authStore';

// In component
const auth = useAuthStore();
console.log('Auth state:', auth);
```

## 🔄 Development Workflow

### 1. Feature Development
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# - Backend: Add routes, models, middleware
# - Frontend: Add components, pages, stores

# 3. Test locally
./start-dev.ps1
# Test all functionality

# 4. Commit changes
git add .
git commit -m "feat: add new feature"

# 5. Push and create PR
git push origin feature/new-feature
```

### 2. Database Changes
```bash
# 1. Update Prisma schema
# Edit backend/prisma/schema.prisma

# 2. Generate migration
npm run db:migrate

# 3. Test migration
npm run db:push

# 4. Update seed data if needed
# Edit backend/src/seed.js
npm run db:seed
```

### 3. API Changes
```bash
# 1. Add new routes
# Create backend/src/routes/newRoute.js

# 2. Update server.js
# Add route import and middleware

# 3. Test endpoints
curl -X POST http://localhost:5000/api/new-route \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## 📦 Package Management

### Backend Dependencies
```bash
# Add production dependency
npm install package-name

# Add development dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Check for vulnerabilities
npm audit
npm audit fix
```

### Frontend Dependencies
```bash
# Add dependency
npm install package-name

# Add development dependency
npm install --save-dev package-name

# Update dependencies
npm update

# Check bundle size
npm run build
```

## 🔒 Security Best Practices

### 1. Environment Variables
```bash
# Never commit secrets
echo ".env" >> .gitignore
echo "*.local" >> .gitignore

# Use strong secrets
JWT_SECRET="your-32-character-super-secret-key-here"
```

### 2. Input Validation
```javascript
// Always validate user input
import { body, validationResult } from 'express-validator';

app.post('/api/users', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

### 3. Authentication
```javascript
// Use middleware for protected routes
app.use('/api/protected', authenticateToken);

// Validate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
```

## 🚀 Performance Optimization

### Backend Optimization
```javascript
// 1. Database query optimization
const products = await prisma.product.findMany({
  include: {
    category: true,
    reviews: true
  },
  where: {
    isActive: true
  }
});

// 2. Caching
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });

// 3. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
```

### Frontend Optimization
```javascript
// 1. Lazy loading
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

// 2. Memoization
const MemoizedComponent = memo(Component);

// 3. Bundle optimization
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'zustand']
        }
      }
    }
  }
});
```

## 📊 Monitoring & Logging

### Backend Monitoring
```javascript
// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Error tracking
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Internal server error' });
});
```

### Frontend Monitoring
```javascript
// Error boundary
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
    // Send to error tracking service
  }
}

// API error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Test and Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm install
      - run: cd backend && npm run db:generate
      - run: cd backend && npm test

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd frontend && npm install
      - run: cd frontend && npm run build
      - run: cd frontend && npm run lint
```

## 📚 Useful Commands

### Development
```bash
# Start development environment
./start-dev.ps1

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Database
npm run db:studio
npm run db:generate
npm run db:push
npm run db:seed
```

### Testing
```bash
# API testing
curl http://localhost:5000/health
curl http://localhost:5000/api/products

# Database testing
npm run db:studio

# Frontend testing
npm run build
npm run preview
```

### Deployment
```bash
# Deploy to Railway
git push origin main

# Check deployment status
railway status

# View logs
railway logs

# Restart services
railway service restart
```

## 🆘 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Kill process
taskkill /PID <PID> /F
```

#### 2. Database Connection Issues
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
npm run db:studio

# Reset database
npm run db:push --force-reset
```

#### 3. CORS Issues
```bash
# Check FRONTEND_URL in backend .env
# Ensure URLs match exactly
# Check for trailing slashes
```

#### 4. Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint
```

## 📞 Getting Help

### Documentation
- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://prisma.io/docs)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)

### Community
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Issues](https://github.com/your-repo/issues)
- [Railway Discord](https://discord.gg/railway)

### Debugging Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Prisma Studio](https://prisma.io/docs/concepts/tools/prisma-studio)
- [Postman](https://postman.com/) for API testing

---

**Happy Coding! 🚀** 