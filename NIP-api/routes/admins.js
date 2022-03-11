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




  /*route to  update user details */

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




  /* DELETE an admin*/
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




module.exports = router;