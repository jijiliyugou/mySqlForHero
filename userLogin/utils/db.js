var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mytest"
});

module.exports = {
  query({ sql, callback }) {
    connection.query(sql, (error, results, fields) => {
      if (error) throw error;
      callback(results);
    });
  }
};
