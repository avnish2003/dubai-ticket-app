const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ticket = require('./models/Ticket');
const Artist = require('./models/Artist');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/latin-notion-festival', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await Ticket.deleteMany({});
    await Artist.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@latinnotion.com',
      password: 'admin123',
      phone: '+971501234567',
      role: 'admin'
    });

    console.log('👤 Created admin user');

    // Create sample tickets
    const tickets = [
      {
        name: 'VIP Pass',
        description: 'Exclusive VIP experience with premium seating and backstage access',
        price: 299,
        originalPrice: 399,
        discount: 25,
        category: 'VIP',
        features: [
          'Premium seating',
          'Backstage access',
          'Meet & greet with artists',
          'VIP welcome package',
          'Complimentary drinks'
        ],
        totalQuantity: 50,
        saleStartDate: new Date('2024-01-01'),
        saleEndDate: new Date('2024-12-31'),
        image: '/images/vip-ticket.jpg'
      },
      {
        name: 'General Admission',
        description: 'Access to all festival events and workshops',
        price: 149,
        originalPrice: 199,
        discount: 25,
        category: 'General',
        features: [
          'Access to all workshops',
          'Festival performances',
          'Dance floor access',
          'Welcome package'
        ],
        totalQuantity: 200,
        saleStartDate: new Date('2024-01-01'),
        saleEndDate: new Date('2024-12-31'),
        image: '/images/general-ticket.jpg'
      },
      {
        name: 'Student Pass',
        description: 'Special pricing for students with valid ID',
        price: 99,
        originalPrice: 149,
        discount: 33,
        category: 'Student',
        features: [
          'Access to all workshops',
          'Festival performances',
          'Student ID required',
          'Welcome package'
        ],
        totalQuantity: 100,
        saleStartDate: new Date('2024-01-01'),
        saleEndDate: new Date('2024-12-31'),
        image: '/images/student-ticket.jpg'
      },
      {
        name: 'Early Bird',
        description: 'Limited time early bird pricing',
        price: 79,
        originalPrice: 149,
        discount: 47,
        category: 'Early Bird',
        features: [
          'Access to all workshops',
          'Festival performances',
          'Early bird exclusive package',
          'Limited quantity available'
        ],
        totalQuantity: 50,
        saleStartDate: new Date('2024-01-01'),
        saleEndDate: new Date('2024-03-31'),
        image: '/images/early-bird-ticket.jpg'
      }
    ];

    await Ticket.insertMany(tickets);
    console.log('🎫 Created sample tickets');

    // Create sample artists
    const artists = [
      {
        name: 'Cornel & Rithika',
        origin: 'India',
        flag: '🇮🇳',
        style: 'CONRI STYLE BACHATA',
        description: 'Revolutionary bachata style creators from India, bringing fresh perspectives to the dance world with their innovative Conri Style Bachata.',
        achievements: [
          'Creators of Conri Style Bachata',
          'International Bachata Champions',
          'Featured in major dance festivals worldwide',
          'YouTube sensations with millions of views'
        ],
        image: '/images/cornel-rithika.jpg',
        socialMedia: {
          instagram: '@cornel_rithika',
          youtube: 'Cornel & Rithika Official'
        },
        isFeatured: true,
        category: 'bachata'
      },
      {
        name: 'Ronald & Alba',
        origin: 'Spain',
        flag: '🇪🇸',
        style: 'BACHATA',
        description: 'Spanish bachata masters known for their passionate and authentic dance style, bringing the true essence of Dominican bachata to the world.',
        achievements: [
          'Spanish Bachata Champions',
          'World Bachata Masters',
          'International workshop instructors',
          'Featured performers at major festivals'
        ],
        image: '/images/ronald-alba.jpg',
        socialMedia: {
          instagram: '@ronald_alba_bachata',
          facebook: 'Ronald & Alba Bachata'
        },
        isFeatured: true,
        category: 'bachata'
      },
      {
        name: 'Korke & Judith',
        origin: 'Spain',
        flag: '🇪🇸',
        style: 'CREATORS OF BACHATA SENSUAL',
        description: 'The legendary creators of Bachata Sensual, revolutionizing the dance with their innovative style that has influenced millions of dancers worldwide.',
        achievements: [
          'Creators of Bachata Sensual',
          'World-renowned dance instructors',
          'International Bachata Champions',
          'Authors of bachata instructional materials'
        ],
        image: '/images/korke-judith.jpg',
        socialMedia: {
          instagram: '@korke_judith',
          youtube: 'Korke & Judith Official'
        },
        isFeatured: true,
        category: 'bachata'
      },
      {
        name: 'DJ Carlos',
        origin: 'Colombia',
        flag: '🇨🇴',
        style: 'LATIN MUSIC',
        description: 'Renowned DJ specializing in Latin music, bringing the perfect rhythm to keep the dance floor alive all night long.',
        achievements: [
          'International DJ Champion',
          'Resident DJ at major festivals',
          'Producer of hit Latin tracks',
          'World-renowned music curator'
        ],
        image: '/images/dj-carlos.jpg',
        socialMedia: {
          instagram: '@dj_carlos_latin',
          facebook: 'DJ Carlos Latin Music'
        },
        isFeatured: true,
        category: 'dj'
      }
    ];

    await Artist.insertMany(artists);
    console.log('🎭 Created sample artists');

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Sample Data Created:');
    console.log(`👤 Admin User: admin@latinnotion.com / admin123`);
    console.log(`🎫 Tickets: ${tickets.length} ticket types`);
    console.log(`🎭 Artists: ${artists.length} artists`);
    console.log('\n🚀 You can now start the server and test the API!');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding
seedData();

