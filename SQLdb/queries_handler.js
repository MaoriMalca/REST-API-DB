const mysqlConnection = require('./connection');

// Generic method which handles queries
exports.queryPromise = function (sql, values = []) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    });
}
