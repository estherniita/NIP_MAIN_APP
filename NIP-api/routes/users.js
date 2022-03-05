const express = require('express');
const router = express.Router();
const newUsers = require('../services/users');
const jwt = require("jsonwebtoken");
const {body} = require('express-validator');
const crypto = require("../cryptojs");
const db = require('../services/db');


/* GET get all registered users. */
router.get('/getAllUsers', async function(req, res, next) {
  try {
    res.json(await newUsers.getAllUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});


/* register new user */
router.post('/register', async function(req, res,  next) {
 

      res.json(await newUsers.register(req.body, (user) =>{

        try {
          if (err) {
              next(err);
          } else {
              const token = jwt.sign({ user }, config.secret, {
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
                      role: user.role,
                      applicant: true
                  }
              });

              return user;
          }
      } catch (error) {
          console; log(err)
      }

  }));

         
      });
    // } catch (err) {
    //   console.error(`Error while creating new user`, err.message);
    //   next(err);
    // }
  



  router.post("/register2", (req, res, next) =>{
    // let newUser = new User({
    //     fname: req.body.fname,
    //     lname: req.body.lname,
    //     phone: req.body.phone,
    //     citizenship: req.body.citizenship,
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password
    // });

    //adding the user to the 
    newUsers.register(req.body, (err, user) => {
        try {
            if (err) {
                next(err);
            } else {
                const token = jwt.sign({ user }, config.secret, {
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
                        role: user.role,
                        applicant: true
                    }
                });
            }
        } catch (error) {
            console; log(err)
        }

    });
});




 
  /* update user details */

router.put('/updateUser/:id', async function(req, res, next) {
    try {
      res.json(await newUsers.updateUser(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user details`, err.message);
      next(err);
    }
  });


  /* DELETE a user*/
router.post('/deleteUser', async function(req, res, next) {
    try {
      res.json(await newUsers.deleteUser(req.body.id ));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
  });


 //email validation route
  router.post('/emailCheck', async function(req, res, next) {
    try {
      res.json(await newUsers.getEmail(req.body.email));
    } catch (err) {
      console.error(`Error while getting email`, err.message);
      next(err);
    }
  });



 
  
 //get user by username
 router.get('/byUsername', async function(req, res, next) {
  try {
    res.json(await newUsers.getUserByUsername(req.body.username));
  } catch (err) {
    console.error(`Error while getting email`, err.message);
    next(err);
  }
});

 
   //email validation route
   router.post('/authenticate', async function(req, res, next) {
    try {
      res.json(await newUsers.authenticate(req.body.username, req.body.password));
    } catch (err) {
      console.error(`Error while login`, err.message);
      next(err);
    }
  });


     //password reset route route
     router.post('/reset-password', async function(req, res, next) {
      try {
        res.json(await newUsers.resetPassword(req.body.email));
      } catch (err) {
        console.error(`Error while reseting password`, err.message);
        next(err);
      }
    });



         //password reset route route
         router.post('/forgotPassword', async function(req, res, next) {
          try {
            res.json(await newUsers.forgotPassword(req.body.email));
          } catch (err) {
            console.error(`Error while reseting password`, err.message);
            next(err);
          }
        });

    

  exports.login = async function(req,res){
    var username= req.body.username;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE username = ?',[username], async function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        if(results.length >0){

          try{
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Username and password does not match"
            })
          }

           }
      catch (err) {
        console.error(`Error occured`, err.message);
        next(err);
      }
        }
        else{
          res.send({
            "code":206,
            "success":"username does not exits"
              });
        }
     
      }
      });
  }


module.exports = router;