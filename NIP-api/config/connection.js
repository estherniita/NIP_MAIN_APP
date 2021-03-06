// S E T U P
const mysql = require('mysql');
let connection;

// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
    connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        // host: "127.0.0.1",
        user: "root",
        password: "",
        database: "national_internship_programme"

    });
// };

// S Q L   C O N N E C T I O N
connection.connect((err)=>{
    if(err){
        console.error(`Error Connection: ${err.stack}`);
        return;
    }
    console.log(`Connected as id: ${connection.threadId}`);
});

connection.on('error', (err)=>{
    console.log(`Error Connecting to Database:\n${err.code}`);
});

module.exports = connection;