const express = require('express');
const router = express.Router();
const newInternships = require('../services/new_internship');
const newInternship = require('../models/new_internship');




/* GET all new internships submitted to different institututions. */
router.get('/getAll', (req,res)=>{

try{
  newInternship.all((data)=>{
      res.json(data);
  })


} catch (error) {

  console.error(`Error while getting the list`, err.message);
  next(error);
}
});

/* POST new internships */


router.post('/sendNewInternships', async function(req, res, next) {
  try {
    res.json(await newInternships.createNewInternship(req.body));
  } catch (err) {
    console.error(`Error while creating inserting available internships`, err.message);
    next(err);
  }
});

// router.post('/sendNewInternships', (req,res, next)=>{
  
//   // try {

//   const cols = "`internships_name`, `company`, `institution`, `email`, `no_of_internship`, `closing_date`";
//   const vals = [`"${req.body.internships_name}"`, `"${req.body.company}"`, `"${req.body.institution}"`, `"${req.body.email}"`, `"${req.body.no_of_internship}"`, `"${req.body.closing_date}"`];

// newInternship.create(cols, vals,  (err, result)=>{
   
    
//   if (err) {
//     res.json({ success: false, msg: 'Failed to register the admin' });
// } else {
//     res.json({ success: true, msg: 'Admin successfully registered' });
// }


  
 
//     });

//   // } catch (error) {
//   //   next(error);
//   // }
 
// })




  /* update new internships */

router.put('/updateNewinternships/:id', async function(req, res, next) {
    try {
      res.json(await newInternships.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating new internships`, err.message);
      next(err);
    }
  });


  /* DELETE new internship */
router.delete('/deleteNewInternship/:id', async function(req, res, next) {
    try {
      res.json(await newInternships.deleteInternship(req.params.id));
    } catch (err) {
      console.error(`Error while deleting new internship`, err.message);
      next(err);
    }
  });



  /* GET get all internship send to IUM. */
router.get('/getIUMInternship', async function(req, res, next) {
  try {
    res.json(await newInternships.getIUMInternship(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});

  /* GET get all internship send to NUST. */
  router.get('/getNUSTInternship', async function(req, res, next) {
    try {
      res.json(await newInternships.getNUSTInternship(req.query.page));
    } catch (err) {
      console.error(`Error while getting the list `, err.message);
      next(err);
    }
  });


    /* GET get all internship send to NIMT. */
router.get('/getNIMTInternship', async function(req, res, next) {
  try {
    res.json(await newInternships.getNIMTInternship(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});

  /* GET get all internship send to UNAM. */
  router.get('/getUNAMInternship', async function(req, res, next) {
    try {
      res.json(await newInternships.getUNAMInternship(req.query.page));
    } catch (err) {
      console.error(`Error while getting the list `, err.message);
      next(err);
    }
  });


  /* GET get all internship send to VTC. */
  router.get('/getVTCInternship', async function(req, res, next) {
    try {
      res.json(await newInternships.getVTCInternship(req.query.page));
    } catch (err) {
      console.error(`Error while getting the list `, err.message);
      next(err);
    }
  });

  router.get('/getAllSendInternship', async function(req, res, next) {
    try {
      res.json(await newInternships.getAllSendInternship(req.query.page));
    } catch (err) {
      console.error(`Error while getting the list `, err.message);
      next(err);
    }
  });



module.exports = router;