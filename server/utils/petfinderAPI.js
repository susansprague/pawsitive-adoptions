const axios = require('axios');

// Function to fetch pets from the Petfinder API
async function fetchPets() {
  try {
    const response = await axios.get('https://api.petfinder.com/v2/animals', {
      params: {
        // Include API key in the request headers
        headers: {
          'Authorization': `Bearer ${process.env.PETFINDER_API_KEY}`,
        },
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { fetchPets };
