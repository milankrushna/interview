const axios = require('axios');

// Create an Axios instance with the 'responseType' set to 'stream'
const axiosInstance = axios.create({
  responseType: 'stream',
});

axiosInstance.get('http://localhost:3000/stream')
  .then((response) => {
    const stream = response.data;

    // Handle the stream data as it arrives
    stream.on('data', (chunk) => {
      console.log('Received chunk:', chunk.toString());
      // You can process the chunk of data here (e.g., append it to a div)
    });

    stream.on('end', () => {
      console.log('Stream ended');
    });

    stream.on('error', (error) => {
      console.error('Stream error:', error);
    });
  })
  .catch((error) => {
    console.error('Error fetching stream:', error);
  });
