import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '../../client/.env')});

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import {logger} from './util/logger';
import Router from './routes/bitmex';

const app: express.Application = express();

const port = process.env.PORT || 3001;

app.set('port', port);
app.use(helmet());
app.use(cors());
app.disable('etag').disable('x-powered-by');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/bitmex', Router);

if (process.env.NODE_ENV != 'development') {
  console.log(`Server is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../client/build')));
  // Handle React routing, return all requests to React app
  app.get('/*', function (req: express.Request, res: express.Response) {
    res.sendFile(path.join(__dirname, '../../', 'client/build/index.html'));
  });
}

// ============LOGGING============
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : 'combined';

app.use(
  morgan(morganFormat, {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(morganFormat, {
    skip: function (req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);

app.get('/', function (req, res) {
  logger.debug('Debug statement');
  logger.info('Info statement');
  res.send(req.method + ' ' + req.originalUrl);
});

app.get('/error', function (req, res) {
  throw new Error('Problem Here!');
});

// // All errors are sent back as JSON
app.use((err: any, req: any, res: any, next: any) => {
  // Fallback to default node handler
  if (res.headersSent) {
    next(err);
    return;
  }

  logger.error(err.message, {url: req.originalUrl});

  res.status(500);
  res.json({error: err.message});
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const server = app.listen(app.get('port'), () => {});

// on kill
process.on('SIGTERM', () => {
  logger.log('warn', 'process.on::SIGTERM');
  server.close(function () {
    process.exit(0);
  });
});

process.on('exit', () => {
  logger.log('warn', 'process.on::exit');
  console.log('exit');
  server.close(function () {
    process.exit(2);
  });
});

// on crash
process.on('uncaughtException', (error) => {
  logger.log('error', 'process.on::uncaughtException');
  logger.log('error', `Something terrible happened: ${error}`);
  server.close(function () {
    process.exit(1);
  }); // exit application
});

export default app;
