const axios = require ('axios');

// Function to fetch pets from the Petfinder API
async function fetchPets() {
  try {

    const token = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: 'DT75AaLbIi1adGvjezFxg76jPv7q0eD8la9gTYTRJUwwqD4Zeg',
      client_secret: 'NKvFY0T5atFlX8LIsx15d3XImDEYhDSodqQfAQrF'
    })

console.log(token)
    const response = await axios.get('https://api.petfinder.com/v2/animals', {

        // Include API key in the request headers
        headers: {
          'Authorization': `Bearer ${token.data.access_token}`,
        }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { fetchPets };
