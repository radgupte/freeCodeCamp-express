let express = require('express');
let app = express();
console.log('Hello World');

// Serving a string
// app.get('/', function (req, res) {
//   res.send('Hello Express');
// });

// Serving static assets
app.use('/public', express.static(__dirname + '/public'));

// Serving an HTML file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

module.exports = app;
