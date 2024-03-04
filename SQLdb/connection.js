const mysqlMod = require('mysql');

require('dotenv').config();

const mysqlConnection = mysqlMod.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'maori',
  password: 'maori753951',
  database: 'USERS'
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


