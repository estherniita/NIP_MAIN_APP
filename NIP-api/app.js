// Express v4.16.0 and higher
// --------------------------
const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const app = express();
const port = 3000;
const path = require('path');
const newInternshipsRouter = require('./routes/new_internship');
const User = require('./routes/users');
const Admin = require('./routes/admins');
const availableInternshipsRoute = require('./routes/available_internship');
const smtpRouter = require('./services/smtp');
const cors = require("cors");
const Organization = require('./routes/organization_register')
const studentInterns = require('./routes/students_interns')
var login = require('./routes/users');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
  uploadDir: './uploads'
});
const request = require("request");

app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '500mb'
}));

// app.use(bodyParser.urlencoded());

// app.use(bodyParser.json());

//set staic folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/new-internships', newInternshipsRouter);

app.use('/user', User);

app.use('/admin', Admin);
app.use('/availableInternships', availableInternshipsRoute);

app.use('/uploads', availableInternshipsRoute);
app.use('/smtp', smtpRouter);

app.use('/organization_register', Organization);

app.use('/student_interns', studentInterns);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.post('/token_validate', (req, res)=>{
      
  let token = req.body.recaptcha;
  const secretkey = "6LcPk74eAAAAACPJwIoIho815RC7dDrQjXRoZOLU"; 
  
  //token validation url 
  
  const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${token}&remoteip=${req.connection.remoteAddress}`
   
 
  // in node req.connection.remoteAddress gives the users ip address
try {  
  if(token === null || token === undefined){
    res.status(201).send({success: false, message: "Token is empty or invalid"})
    return console.log("recaptcha token empty", req.remoteAddress);
  }
  
  request(url, function(err, response, body){
    //the body is the data that contains success message
    body = JSON.parse(body);
    
    //check if the validation failed
    if(body.success !== undefined && !body.success){
         res.send({success: false, 'message': "recaptcha failed"});
         return console.log("Recaptcha failed.", req.connection.remoteAddress);
     }
    
    //if passed response success message to client
     res.send({"success": true, 'message': "Recaptcha passed"});
    
  })
  
} catch (error) {
  console.log(error);
}

})


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});