const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.static('public'));

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const text = "This is a simulated streaming response from your chatbot. older browsers due to the underlying use of XMLHttpRequest. Modern browsers and Node.js environments generally handle streams well. If targeting older browsers, consider using fetch API directly or explore alternative approaches. Server Configuration";
  let index = 0;
    const splitText = text.split(" ")
  const interval = setInterval(() => {
    if (index < splitText.length) {
      res.write(`data: ${splitText[index++]} \n\n`);
    } else {
      clearInterval(interval);
      res.write('event: done\ndata: complete\n\n');
      res.end();
    }
  }, 100);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
