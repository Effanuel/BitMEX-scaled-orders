import dotenv from 'dotenv';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser = require('body-parser');

import Router from './routes/bitmex';

import path = require('path');
// import process from "process";

dotenv.config();

const app: express.Application = express();

const port = process.env.PORT || 3001;

app.set('port', port);
app.use(helmet());
app.use(cors());
app.disable('etag').disable('x-powered-by');

// exports.get404 = (req, res, next) => {
//   res.status(404).render('404', {pageTitle: 'Page not found'})
// }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/bitmex', Router);

//require('./routes')(app);

if (process.env.NODE_ENV != 'development ') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../client/build')));

  // Handle React routing, return all requests to React app
  app.get('/*', function(req: express.Request, res: express.Response) {
    res.sendFile(path.join(__dirname, '../', 'client/build/index.html'));
  });
}

const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

process.on('SIGTERM', function() {
  server.close(function() {
    process.exit(0);
  });
});

process.on('uncaughtException', error => {
  console.log('Oh my god, something terrible happend: ', error);

  process.exit(1); // exit application
});

export default app;
