const mysqlMod = require('mysql');

require('dotenv').config();

const mysqlConnection = mysqlMod.createConnection({
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB
});

// Connect to the database
mysqlConnection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL as id ' + mysqlConnection.threadId);
});

module.exports = mysqlConnection;


