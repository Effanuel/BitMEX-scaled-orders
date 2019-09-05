require("dotenv").config();

const express = require("express"),
  BitMEXClient = require("bitmex-realtime-api"),
  app = express(),
  helmet = require("helmet"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  bitmexRoutes = require("./routes/bitmex"),
  path = require("path");

const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.disable("etag").disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/bitmex", bitmexRoutes);

//require('./routes')(app);

if (process.env.NODE_ENV != "development ") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});

module.exports = app;
