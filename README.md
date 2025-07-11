<<<<<<< HEAD
# CommerceFlow v2 🛍️

A modern, full-stack e-commerce application built with React, Express, Prisma, and PostgreSQL. Deployed seamlessly on Railway with a beautiful, responsive UI and comprehensive backend API.

## ✨ Features

### 🛒 E-commerce Features
- **Product Management**: Full CRUD operations with categories, images, and inventory
- **Shopping Cart**: Add, update, remove items with real-time sync
- **Order Management**: Complete order lifecycle with status tracking
- **User Reviews**: Product ratings and comments system
- **Search & Filtering**: Advanced product search with multiple filters
- **Responsive Design**: Mobile-first approach with modern UI/UX

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: User and Admin roles with permissions
- **Password Hashing**: Secure password storage with bcrypt
- **Input Validation**: Comprehensive form validation
- **Rate Limiting**: API protection against abuse

### 🎨 Modern UI/UX
- **Tailwind CSS**: Utility-first styling with custom design system
- **Color Themes**: Beautiful gradient and color palette
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Works perfectly on all devices
- **Accessibility**: WCAG compliant components

### 🚀 Performance & Scalability
- **Prisma ORM**: Type-safe database queries
- **PostgreSQL**: Robust relational database
- **Railway Deployment**: Zero-config deployment
- **Optimized Builds**: Fast loading and efficient code splitting
- **Error Handling**: Comprehensive error management

## 🏗️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

### Backend
- **Express.js** - Fast, unopinionated web framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Powerful, open-source database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Deployment
- **Railway** - Zero-config deployment platform
- **PostgreSQL** - Managed database service

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Railway account
- PostgreSQL database (Railway provides this)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd commerceFlow-v2
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Configure your environment variables
# DATABASE_URL - Your Railway PostgreSQL URL
# JWT_SECRET - A strong secret key
# FRONTEND_URL - Your frontend URL

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🌱 Database Seeding

The application comes with sample data for testing:

### Test Accounts
- **Admin**: `admin@commerceflow.com` / `admin123`
- **User**: `user@commerceflow.com` / `user123`

### Sample Data
- 5 product categories (Electronics, Clothing, Home & Garden, Books, Sports)
- 10 sample products with images and descriptions
- Complete database schema with relationships

## 🚀 Railway Deployment

### 1. Backend Deployment

1. Connect your GitHub repository to Railway
2. Create a new service from the `backend` directory
3. Add environment variables:
   ```
   DATABASE_URL=your-railway-postgres-url
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=production
   FRONTEND_URL=your-frontend-url
   ```
4. Deploy automatically on push to main branch

### 2. Frontend Deployment

1. Create another service from the `frontend` directory
2. Add environment variables:
   ```
   VITE_API_URL=your-backend-railway-url/api
   ```
3. Deploy automatically on push to main branch

### 3. Database Setup

1. Create a PostgreSQL service in Railway
2. Copy the DATABASE_URL to your backend environment variables
3. Run migrations and seed data:
   ```bash
   npm run db:push
   npm run db:seed
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Product Endpoints
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Order Endpoints
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/create` - Create order from cart
- `PUT /api/orders/:id/status` - Update order status (admin)

### Review Endpoints
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Accent**: Yellow (#eab308)
- **Success**: Green (#22c55e)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Cards**: Hover effects and shadows
- **Forms**: Consistent styling with validation
- **Badges**: Status indicators
- **Modals**: Overlay dialogs

## 🔧 Available Scripts

### Backend
```bash
npm run dev          # Start development server
npm start           # Start production server
npm run db:generate # Generate Prisma client
npm run db:push     # Push schema to database
npm run db:migrate  # Run database migrations
npm run db:studio   # Open Prisma Studio
npm run db:seed     # Seed database with sample data
```

### Frontend
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🛡️ Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** with bcrypt (12 rounds)
- **CORS Configuration** for cross-origin requests
- **Rate Limiting** to prevent abuse
- **Input Validation** with express-validator
- **Security Headers** with Helmet.js
- **SQL Injection Protection** with Prisma ORM
- **XSS Protection** with proper content encoding

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface
- **Optimized images** and loading
- **Progressive enhancement**

## 🔍 Performance Optimizations

- **Code Splitting** with React Router
- **Lazy Loading** for components
- **Image Optimization** with proper sizing
- **Caching** strategies
- **Minified** production builds
- **Tree Shaking** for unused code removal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review the documentation above
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- **Railway** for seamless deployment
- **Prisma** for excellent ORM
- **Tailwind CSS** for beautiful styling
- **React** team for the amazing framework
- **Vite** for fast development experience

---

**Built with ❤️ for modern e-commerce** 
=======
# commerceFlow-v2
>>>>>>> a7e26dcdcb983a22cf24942c9f9bf9444defe5c7
