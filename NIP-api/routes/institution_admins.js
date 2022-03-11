const express = require('express');
const router = express.Router();
const registeredInstitutions = require('../services/institution_admins');


/* POST new institution  registration */
router.post('/registerInstitution', async function(req, res, next) {
    try {
      res.json(await registeredInstitutions.register(req.body));
    } catch (err) {
      console.error(`Error while registering new organization`, err.message);
      next(err);
    }
  });


/* GET get the list of all registered institutions. */
router.get('/getAllRegisteredInstitution', async function(req, res, next) {
  try {
    res.json(await registeredInstitutions.getAllRegisteredInstitution(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});


 //email validation route
 router.post('/emailCheck', async function(req, res, next) {
  try {
    res.json(await  registeredInstitutions.getEmail(req.body.email));
  } catch (err) {
    console.error(`Error while getting email`, err.message);
    next(err);
  }
});
   



  /* update new institution details */

router.put('/updateInstitutionDetails/:id', async function(req, res, next) {
    try {
      res.json(await registeredInstitutions.updateInstitutionDetails(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating institution details`, err.message);
      next(err);
    }
  });


  
  /* DELETE institution */
router.delete('deleteInstitution/:id', async function(req, res, next) {
    try {
      res.json(await registeredInstitutions.deleteInstitution(req.params.id));
    } catch (err) {
      console.error(`Error while deleting institution`, err.message);
      next(err);
    }
  });

module.exports = router;