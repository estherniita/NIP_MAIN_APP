const express = require('express');
const router = express.Router();
const registeredOrganizations = require('../services/organization_register');


/* GET get the list of all registered organizations. */
router.get('/getAllRegisteredOrganization', async function(req, res, next) {
  try {
    res.json(await registeredOrganizations.getAllRegisteredOrganization(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});


 //email validation route
 router.post('/emailCheck', async function(req, res, next) {
  try {
    res.json(await  registeredOrganizations.getEmail(req.body.email));
  } catch (err) {
    console.error(`Error while getting email`, err.message);
    next(err);
  }
});
   

 //getRegistrationNumber validation route
 router.post('/getRegistrationNumber', async function(req, res, next) {
  try {
    res.json(await  registeredOrganizations.getRegistrationNumber(req.body.registration_number));
  } catch (err) {
    console.error(`Error while getting registration number`, err.message);
    next(err);
  }
});



/* GET the registration number. */
router.get('/getOrganizationByRegistrationNo', async function(req, res, next) {
  try {
    res.json(await registeredOrganizations.getOrganizationByRegistrationNo(req.body.registration_number));
  } catch (err) {
    console.error(`Error while getting the list of registration number`, err.message);
    next(err);
  }
});

/* POST new organization */
router.post('/registerOrganizations', async function(req, res, next) {
    try {
      res.json(await registeredOrganizations.register(req.body));
    } catch (err) {
      console.error(`Error while registering new organization`, err.message);
      next(err);
    }
  });

  


  /* update new organization details */

router.put('/updateOrganizationDetails/:id', async function(req, res, next) {
    try {
      res.json(await registeredOrganizations.updateOrganizationDetails(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating organization details`, err.message);
      next(err);
    }
  });


  /* DELETE organization */
router.delete('/deleteOrganization/:id', async function(req, res, next) {
    try {
      res.json(await registeredOrganizations.deleteOrganization(req.params.id));
    } catch (err) {
      console.error(`Error while deleting organization`, err.message);
      next(err);
    }
  });

module.exports = router;