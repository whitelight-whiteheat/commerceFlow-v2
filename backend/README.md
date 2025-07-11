# CommerceFlow Backend API

A modern, scalable e-commerce backend built with Express.js, Prisma, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations with filtering, search, and pagination
- **Shopping Cart**: Add, update, remove items with stock validation
- **Order Management**: Complete order lifecycle with status tracking
- **Review System**: Product reviews with ratings and comments
- **User Management**: Profile management and admin controls
- **Category Management**: Organized product categorization
- **Database**: PostgreSQL with Prisma ORM for type-safe queries

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Railway account (for deployment)

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS

### 3. Database Setup

Generate Prisma client and run migrations:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (if using migrations)
npm run db:migrate
```

### 4. Seed Database

Populate the database with sample data:

```bash
npm run db:seed
```

This creates:
- Admin user: `admin@commerceflow.com` / `admin123`
- Regular user: `user@commerceflow.com` / `user123`
- Sample categories and products

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category with products
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/create` - Create order from cart
- `PUT /api/orders/:id/status` - Update order status (admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/user/me` - Get user's reviews

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id/role` - Update user role
- `GET /api/users/me/stats` - Get user statistics

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run build` - Build for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🚀 Deployment

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

```bash
DATABASE_URL="your-railway-postgres-url"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
FRONTEND_URL="your-frontend-url"
```

## 🛡️ Security Features

- JWT authentication with secure token handling
- Password hashing with bcrypt
- CORS configuration
- Rate limiting
- Input validation with express-validator
- Helmet.js for security headers
- Role-based access control

## 📊 Database Schema

The application uses the following main entities:
- **Users**: Authentication and profile data
- **Categories**: Product categorization
- **Products**: Product information and inventory
- **CartItems**: Shopping cart management
- **Orders**: Order management with items
- **Reviews**: Product reviews and ratings

## 🔍 Health Check

The API includes a health check endpoint:
- `GET /health` - Returns server status and timestamp

## 📝 Error Handling

Comprehensive error handling for:
- Database errors (Prisma)
- Validation errors
- Authentication errors
- File upload errors
- General server errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 