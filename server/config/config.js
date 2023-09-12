//general starter code which might require revision; actual values etc - Dele
module.exports = {
    // Database configuration
    db: {
      // MongoDB connection URL (N.B. - use our own URL)
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/pawsitive-adoptions',
    },
    
    // Authentication settings
    auth: {
      // Secret key for JWT token generation (secret and unique)
      jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    },
    
    // Server configuration
    server: {
      // Port on which the server will run (subject to change - Dele)
      port: process.env.PORT || 4000,
    },
    
    // Petfinder API configuration
    petfinder: {
      apiKey: process.env.PETFINDER_API_KEY || 'your-petfinder-api-key',
      apiSecret: process.env.PETFINDER_API_SECRET || 'your-petfinder-api-secret',
    },
  };
