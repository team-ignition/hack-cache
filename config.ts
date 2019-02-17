const argv = require("yargs").argv;

export default {
  name: "trl-events-cache",
  version: "POC-v2",
  initBlock:  2575300,
  env: process.env.NODE_ENV || "development",
  node_uri: process.env.NODE_URI || "ws://18.188.91.154:8546",
  strictRouting: true,
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017",
    name: process.env.DB_NAME || "trl-cache-v2",
    reset: process.env.DB_RESET || argv.reset === true || false
  },
  rabbit: {
    uri: process.env.RABBIT_URI || "amqp://localhost:5672",
    name: process.env.RABBIT_NAME || "trl"
  }
};
