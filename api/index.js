const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  request = require("request"),
  adminRoutes = require("./routes/admin"),
  path = require("path");

const port = process.env.PORT || 3001;
require("dotenv").config();

app.use(cors());
app.disable("etag").disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/admin", adminRoutes);

//require('./routes')(app);
console.log(process.env.NODE_ENV, "ENV PROCESS");
console.log(process.env.API_KEY, "sec key");
if (process.env.NODE_ENV != "development ") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("running on: " + port);
});

module.exports = app;
