# Latin Notion Bachata Festival - Backend API

A complete backend API for the Latin Notion Bachata Festival website with user authentication, ticket booking, and artist management.

## 🚀 Features

- **User Authentication** - Register, login, and profile management
- **Ticket Management** - Create, update, and manage festival tickets
- **Booking System** - Complete ticket booking with payment integration
- **Artist Management** - Manage festival lineup and artist information
- **Admin Panel** - Full admin access for managing the festival
- **Payment Integration** - Stripe payment processing
- **Security** - JWT authentication, rate limiting, input validation

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/latin-notion-festival
   JWT_SECRET=your-super-secret-jwt-key-here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Seed the database**
   ```bash
   node seed.js
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create ticket (Admin)
- `PUT /api/tickets/:id` - Update ticket (Admin)
- `DELETE /api/tickets/:id` - Delete ticket (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/cancel` - Cancel booking
- `GET /api/bookings/admin/all` - Get all bookings (Admin)

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/featured` - Get featured artists
- `GET /api/artists/category/:category` - Get artists by category
- `POST /api/artists` - Create artist (Admin)
- `PUT /api/artists/:id` - Update artist (Admin)
- `DELETE /api/artists/:id` - Delete artist (Admin)

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 👤 Sample Users

After seeding, you'll have:
- **Admin User**: admin@latinnotion.com / admin123

## 🎫 Sample Tickets

The database will be seeded with:
- VIP Pass - $299 (25% discount)
- General Admission - $149 (25% discount)
- Student Pass - $99 (33% discount)
- Early Bird - $79 (47% discount)

## 🎭 Sample Artists

The database will be seeded with:
- Cornel & Rithika (India)
- Ronald & Alba (Spain)
- Korke & Judith (Spain)
- DJ Carlos (Colombia)

## 🔧 Development

### Project Structure
```
backend/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── server.js        # Main server file
└── seed.js          # Database seeding
```

### Adding New Features

1. **Create Model** - Define data structure in `models/`
2. **Create Controller** - Add business logic in `controllers/`
3. **Create Routes** - Define API endpoints in `routes/`
4. **Add Validation** - Use express-validator for input validation
5. **Test Endpoints** - Use Postman or similar tools

## 🚀 Deployment

1. **Set production environment variables**
2. **Build the application**
3. **Deploy to your preferred platform** (Heroku, AWS, DigitalOcean)
4. **Set up MongoDB Atlas** for production database
5. **Configure Stripe** for payment processing

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@latinnotion.com or create an issue in the repository.




