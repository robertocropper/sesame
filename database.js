const Pool = require("pg").Pool;
require("dotenv").config();

const development = {
  user: process.env.DEV_USERNAME,
  password: process.env.DEV_PASSWORD,
  host: process.env.DEV_HOSTNAME,
  port: process.env.DEV_PORT,
  database: process.env.DEV_DATABASE,
};

const production = {
  user: process.env.USERNAME,
  host: process.env.HOSTNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORTS,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA_CERT,
  },
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? production : development
);

module.exports = pool;
