const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Latin Notion Bachata Festival Backend...\n');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
  } else {
    // Create basic .env file
    const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/latin-notion-festival

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file with default values');
  }
} else {
  console.log('✅ .env file already exists');
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
} else {
  console.log('✅ uploads directory already exists');
}

console.log('\n📋 Setup Instructions:');
console.log('1. Install dependencies: npm install');
console.log('2. Start MongoDB on your system');
console.log('3. Update .env file with your configuration');
console.log('4. Seed the database: node seed.js');
console.log('5. Start the server: npm run dev');
console.log('\n🎯 Default Admin Credentials:');
console.log('Email: admin@latinnotion.com');
console.log('Password: admin123');
console.log('\n🔗 API will be available at: http://localhost:5000/api');
console.log('📱 Frontend should run at: http://localhost:3000');
console.log('\n✨ Setup complete! Happy coding!');




