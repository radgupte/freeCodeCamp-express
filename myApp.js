let express = require('express');
let app = express();
console.log('Hello World');

// Serving a string
// app.get('/', function (req, res) {
//   res.send('Hello Express');
// });

// Serving static assets
app.use('/public', express.static(__dirname + '/public'));

//Implementing a root-level request logger middleware
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// Serving an HTML file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Serving JSON on a specific route
let messageObject = { message: 'Hello json' };
app.get('/json', function (req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    var u = JSON.parse(JSON.stringify(messageObject));
    u.message = u.message.toUpperCase();
    return res.json(u);
  } else {
    return res.json(messageObject);
  }
});
module.exports = app;
