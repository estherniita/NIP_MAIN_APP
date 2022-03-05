const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}



// query.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// module.exports=con;

module.exports = {
  query
}




