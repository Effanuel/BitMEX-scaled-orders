import app from './app';
import process from 'process';
const server = app.listen(app.get('port'), () => {
  process.on('SIGTERM', function() {
    server.close(function() {
      process.exit(0);
    });
  });
});

export default server;
