require('dotenv').config();

const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  request = require('request'),
  bitmexRoutes = require('./routes/bitmex'),
  path = require('path');

const port = process.env.PORT || 3001;

app.use(cors());
app.disable('etag').disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/bitmex', bitmexRoutes);

//require('./routes')(app);

if (process.env.NODE_ENV != 'development ') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on: htpp://localhost:${port}`);
});

module.exports = app;
