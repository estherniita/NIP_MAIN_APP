const express = require('express');
const router = express.Router();
const newAdmin = require('../services/admins');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const db = require('../services/db');


/* GET get all registered users. */
router.get('/getAllAdmins', async function(req, res, next) {
  try {
    res.json(await newAdmin.getAllAdmins(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});


/* register new user */
router.post('/register', async function(req, res, next) {
    try {
      res.json(await newAdmin.registerAdmin(req.body));
    } catch (err) {
      console.error(`Error while creating new user`, err.message);
      next(err);
    }
  });


  router.post('/register2', async function(req, res, next) {
    // try {
    //   res.json(await newAdmin.register(req.body));
    // } catch (err) {
    //   console.error(`Error while creating new user`, err.message);
    //   next(err);
    // }

  

  //adding the user to the 
  // newAdmin.register(newUser, (err, user) => {

   

        res.json(await newAdmin.registerAdmin(req.body, (err, user) => {
        // res.json(await newAdmin.register(req.body));
        //  } catch (err) {
        // console.error(`Error while creating new user`, err.message);
        // next(err);
        // }


          try {

   
          if (err) {
              next(err);
          } else {
              const token = jwt.sign({ admin }, config.secret, {
                  //1 wek in seconds this to force the use to log in after every week, that is when the token
                  //gets expired
                  expiresIn: "5h"
              });

              res.json({
                  success: true,
                  token: crypto.encrypt(token, config.secret),
                  user: {
                      username: user.username,
                      email: user.email,
                      role: user.role
                      // applicant: true
                  }
              });
          }

          console.log(token);
      } catch (err) {
        console.log(err);
    }
  }));
  }); 


  /* update user details */

router.put('/updateAdmin/:id', async function(req, res, next) {
    try {

      if (req.body.password) {
      
      res.json(await newAdmin.updateAdmin(req.params.id, req.body));

      }

      else {

        res.json(await newAdmin.updateAdmin1(req.params.id, req.body));
      }
    } catch (err) {
      console.error(`Error while updating admin details`, err.message);
      next(err);
    }
  });




  /* DELETE a user*/
router.post('/deleteAdmin', async function(req, res, next) {
    try {
      res.json(await newAdmin.deleteAdmin(req.body.id ));
    } catch (err) {
      console.error(`Error while deleting admin`, err.message);
      next(err);
    }
  });


 //email validation route
  router.post('/emailCheck', async function(req, res, next) {
    try {
      res.json(await newAdmin.getEmail(req.body.email));
    } catch (err) {
      console.error(`Error while getting email`, err.message);
      next(err);
    }
  });



 
  
 //get user by username
 router.get('/byUsername', async function(req, res, next) {
  try {
    res.json(await newAdmin.getAdminByUsername(req.body.username));
  } catch (err) {
    console.error(`Error while getting email`, err.message);
    next(err);
  }
});

 
   //email validation route
   router.post('/authenticate', async function(req, res, next) {
    try {
      res.json(await newAdmin.authenticate(req.body.username, req.body.password));
    } catch (err) {
      console.error(`Error while login`, err.message);
      next(err);
    }
  });


     //password reset route route
     router.post('/reset-password', async function(req, res, next) {
      try {
        res.json(await newAdmin.resetPassword(req.body.email));
      } catch (err) {
        console.error(`Error while reseting password`, err.message);
        next(err);
      }
    });



         //password reset route route
         router.post('/forgotPassword', async function(req, res, next) {
          try {
            res.json(await newAdmin.forgotPassword(req.body.email));
          } catch (err) {
            console.error(`Error while reseting password`, err.message);
            next(err);
          }
        });

    

  // exports.login = async function(req,res){
  //   var username= req.body.username;
  //   var password = req.body.password;
  //   db.query('SELECT * FROM users WHERE username = ?',[username], async function (error, results, fields) {
  //     if (error) {
  //       res.send({
  //         "code":400,
  //         "failed":"error ocurred"
  //       })
  //     }else{
  //       if(results.length >0){
  //         const comparision = await bcrypt.compare(password, results[0].password)
  //         if(comparision){
  //             res.send({
  //               "code":200,
  //               "success":"login sucessfull"
  //             })
  //         }
  //         else{
  //           res.send({
  //                "code":204,
  //                "success":"Username and password does not match"
  //           })
  //         }
  //       }
  //       else{
  //         res.send({
  //           "code":206,
  //           "success":"username does not exits"
  //             });
  //       }
  //     }
  //     });
  // }


module.exports = router;