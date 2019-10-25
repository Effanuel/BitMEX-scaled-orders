import app from "./app";
import process from "process";
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

process.on("SIGTERM", function() {
  server.close(function() {
    process.exit(0);
  });
});

export default server;
