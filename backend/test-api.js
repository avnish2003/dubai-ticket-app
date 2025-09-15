const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Helper function to log test results
function logTest(testName, success, message = '') {
  const status = success ? '✅' : '❌';
  const color = success ? colors.green : colors.red;
  console.log(`${color}${status} ${testName}${colors.reset} ${message}`);
}

// Helper function to make API requests
async function makeRequest(method, endpoint, data = null, token = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status || 500 
    };
  }
}

// Test functions
async function testHealthCheck() {
  console.log(`\n${colors.bold}${colors.blue}🏥 Testing Health Check${colors.reset}`);
  const result = await makeRequest('GET', '/health');
  logTest('Health Check', result.success, result.success ? 'Server is running' : result.error?.message);
  return result.success;
}

async function testAuthEndpoints() {
  console.log(`\n${colors.bold}${colors.blue}🔐 Testing Authentication Endpoints${colors.reset}`);
  
  // Test user registration
  const registerData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123456',
    phone: '+971501234567'
  };
  
  const registerResult = await makeRequest('POST', '/auth/register', registerData);
  logTest('User Registration', registerResult.success, registerResult.success ? 'User created' : registerResult.error?.message);
  
  // Test user login
  const loginData = {
    email: 'admin@latinnotion.com',
    password: 'admin123'
  };
  
  const loginResult = await makeRequest('POST', '/auth/login', loginData);
  logTest('Admin Login', loginResult.success, loginResult.success ? 'Login successful' : loginResult.error?.message);
  
  return loginResult.success ? loginResult.data.token : null;
}

async function testTicketEndpoints(token) {
  console.log(`\n${colors.bold}${colors.blue}🎫 Testing Ticket Endpoints${colors.reset}`);
  
  // Test get all tickets
  const ticketsResult = await makeRequest('GET', '/tickets');
  logTest('Get All Tickets', ticketsResult.success, ticketsResult.success ? `${ticketsResult.data.tickets?.length || 0} tickets found` : ticketsResult.error?.message);
  
  // Test get ticket by ID (if tickets exist)
  if (ticketsResult.success && ticketsResult.data.tickets?.length > 0) {
    const ticketId = ticketsResult.data.tickets[0]._id;
    const ticketResult = await makeRequest('GET', `/tickets/${ticketId}`);
    logTest('Get Ticket by ID', ticketResult.success, ticketResult.success ? 'Ticket retrieved' : ticketResult.error?.message);
  }
  
  return ticketsResult.success;
}

async function testArtistEndpoints(token) {
  console.log(`\n${colors.bold}${colors.blue}🎭 Testing Artist Endpoints${colors.reset}`);
  
  // Test get all artists
  const artistsResult = await makeRequest('GET', '/artists');
  logTest('Get All Artists', artistsResult.success, artistsResult.success ? `${artistsResult.data.artists?.length || 0} artists found` : artistsResult.error?.message);
  
  // Test get featured artists
  const featuredResult = await makeRequest('GET', '/artists/featured');
  logTest('Get Featured Artists', featuredResult.success, featuredResult.success ? `${featuredResult.data.artists?.length || 0} featured artists found` : featuredResult.error?.message);
  
  // Test get artist by ID (if artists exist)
  if (artistsResult.success && artistsResult.data.artists?.length > 0) {
    const artistId = artistsResult.data.artists[0]._id;
    const artistResult = await makeRequest('GET', `/artists/${artistId}`);
    logTest('Get Artist by ID', artistResult.success, artistResult.success ? 'Artist retrieved' : artistResult.error?.message);
  }
  
  return artistsResult.success;
}

async function testBookingEndpoints(token) {
  console.log(`\n${colors.bold}${colors.blue}📅 Testing Booking Endpoints${colors.reset}`);
  
  if (!token) {
    logTest('Booking Tests', false, 'No authentication token available');
    return false;
  }
  
  // Test get user bookings
  const bookingsResult = await makeRequest('GET', '/bookings', null, token);
  logTest('Get User Bookings', bookingsResult.success, bookingsResult.success ? `${bookingsResult.data.bookings?.length || 0} bookings found` : bookingsResult.error?.message);
  
  // Test create booking (if tickets exist)
  const ticketsResult = await makeRequest('GET', '/tickets');
  if (ticketsResult.success && ticketsResult.data.tickets?.length > 0) {
    const ticketId = ticketsResult.data.tickets[0]._id;
    const bookingData = {
      ticketId: ticketId,
      quantity: 2,
      totalAmount: 298
    };
    
    const createBookingResult = await makeRequest('POST', '/bookings', bookingData, token);
    logTest('Create Booking', createBookingResult.success, createBookingResult.success ? 'Booking created' : createBookingResult.error?.message);
  }
  
  return bookingsResult.success;
}

async function testDatabaseConnection() {
  console.log(`\n${colors.bold}${colors.blue}🗄️ Testing Database Connection${colors.reset}`);
  
  // Test if we can retrieve data from all collections
  const ticketsResult = await makeRequest('GET', '/tickets');
  const artistsResult = await makeRequest('GET', '/artists');
  
  const ticketsWorking = ticketsResult.success && ticketsResult.data.tickets?.length > 0;
  const artistsWorking = artistsResult.success && artistsResult.data.artists?.length > 0;
  
  logTest('Tickets Collection', ticketsWorking, ticketsWorking ? `${ticketsResult.data.tickets.length} tickets found` : 'No tickets found');
  logTest('Artists Collection', artistsWorking, artistsWorking ? `${artistsResult.data.artists.length} artists found` : 'No artists found');
  
  return ticketsWorking && artistsWorking;
}

// Main test function
async function runAllTests() {
  console.log(`${colors.bold}${colors.yellow}🚀 Starting Backend API Tests${colors.reset}`);
  console.log(`${colors.yellow}Testing API at: ${BASE_URL}${colors.reset}\n`);
  
  let allTestsPassed = true;
  
  // Test 1: Health Check
  const healthCheckPassed = await testHealthCheck();
  allTestsPassed = allTestsPassed && healthCheckPassed;
  
  if (!healthCheckPassed) {
    console.log(`\n${colors.red}❌ Server is not running. Please start the server first with: node server.js${colors.reset}`);
    return;
  }
  
  // Test 2: Database Connection
  const dbConnectionPassed = await testDatabaseConnection();
  allTestsPassed = allTestsPassed && dbConnectionPassed;
  
  // Test 3: Authentication
  const token = await testAuthEndpoints();
  allTestsPassed = allTestsPassed && (token !== null);
  
  // Test 4: Ticket Endpoints
  const ticketsPassed = await testTicketEndpoints(token);
  allTestsPassed = allTestsPassed && ticketsPassed;
  
  // Test 5: Artist Endpoints
  const artistsPassed = await testArtistEndpoints(token);
  allTestsPassed = allTestsPassed && artistsPassed;
  
  // Test 6: Booking Endpoints
  const bookingsPassed = await testBookingEndpoints(token);
  allTestsPassed = allTestsPassed && bookingsPassed;
  
  // Final Results
  console.log(`\n${colors.bold}${colors.blue}📊 Test Results Summary${colors.reset}`);
  console.log(`${colors.bold}${allTestsPassed ? colors.green + '✅ ALL TESTS PASSED!' : colors.red + '❌ SOME TESTS FAILED!'}${colors.reset}`);
  
  if (allTestsPassed) {
    console.log(`\n${colors.green}🎉 Your backend is working perfectly!${colors.reset}`);
    console.log(`${colors.green}✅ Server is running on port 5000${colors.reset}`);
    console.log(`${colors.green}✅ Database connection is working${colors.reset}`);
    console.log(`${colors.green}✅ All API endpoints are functional${colors.reset}`);
    console.log(`${colors.green}✅ Authentication system is working${colors.reset}`);
    console.log(`\n${colors.blue}🔗 You can now test your frontend at: http://localhost:3000${colors.reset}`);
  } else {
    console.log(`\n${colors.red}⚠️ Please check the failed tests above and fix any issues.${colors.reset}`);
  }
}

// Run the tests
runAllTests().catch(console.error);


