const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

//   connection.end(function(err) {
//     if(err) {
//         console.log(err.message);
//     }
// });

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




