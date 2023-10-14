let express = require('express');
let app = express();
console.log('Hello World');

// Serving a string
// app.get('/', function (req, res) {
//   res.send('Hello Express');
// });

//Implementing a root-level request logger middleware
// app.use((req, res, next) => {
//   console.log(req.method + ' ' + req.path + ' - ' + req.ip);
//   next();
// });

// Chain middleware to create a Time Server
app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Getting route parameter input from the client
app.get('/:word/echo', (req, res) => {
  var { word } = req.params;
  res.json({ echo: word });
});

// Getting query parameter input from the client
app.get('/name', (req, res) => {
  var firstname = req.query.first;
  var lastname = req.query.last;
  res.json({ name: firstname + ' ' + lastname });
});

// Serving static assets
app.use('/public', express.static(__dirname + '/public'));

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
