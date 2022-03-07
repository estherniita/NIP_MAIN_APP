const express = require('express');
const router = express.Router();
const availableInternship = require('../services/available_internships');
var multer = require('multer');

var storage_product = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, '/var/www/html/frontend/assets/documents/companies/');
      // callback(null, '../frontend/src/assets/documents/companies/');

    
      //callback(null, './uploads/img/team');
      //Use next line in production change path to ../public/assets/profiles/...
      //!callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
      const prefix = "NIP";
      const postfix = ".pdf";
      const filename = prefix + '-' + Date.now() + postfix;
      callback(null, filename)
     
      //! use next line where no extension
      //callback(null, file.originalname + '.' + mime.getExtension(file.mimetype))
  }
});

//Multer Mime type validation
var upload_product = multer({
  storage: storage_product,
  limits: { fieldSize: 10 * 1024 * 1024 }, //10mb file size
  fileFilter: (req, file, cb) => {

    
      if (file.mimetype == "application/pdf" ){
         
        try{
          cb(null, true);}
      
      catch (err) {
        console.error(`Error while uploading `, err.message);
        next(err);
      }
    }
      else {
          cb(null, false); 
          return cb(new Error('Allowed only .pdf files'));
      }
  },
  
});



/* GET get new internship list languages. */
router.get('/getAllavailableInternships', async function(req, res, next) {
  
  try {
    res.json(await availableInternship.getAllavailableInternships(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});



router.get('/getAllavailableInternships1', async function(req, res, next) {
  
  try {
    res.json(await availableInternship.getAllavailableInternships1(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});


/* GET get new internship list languages. */
router.get('/getAllInternshipName', async function(req, res, next) {
  try {
    res.json(await availableInternship.getAllInternshipName(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list of internship name`, err.message);
    next(err);
  }
});

/* POST new internships */
router.post('/availableInternship', upload_product.single('pdf_file'), async function(req, res, next) {
  const internship = {
    company_name: req.body.company_name,
    town_city: req.body.town_city,
    internship_name: req.body.internship_name,
    registration_number: req.body.registration_number,
    number_of_positions: req.body.number_of_positions,
    email: req.body.email,
    closing_date: req.body.closing_date,
    pdf_file: req.file.filename

  }
    try {
      res.json(await availableInternship.availableInternships(internship));
    } catch (err) {
      console.error(`Error while creating inserting available internships`, err.message);
      next(err);
    }
  });

  


  /* update new internships */

router.put('/updateNewinternships/:id', async function(req, res, next) {
    try {
      res.json(await availableInternship.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating new internships`, err.message);
      next(err);
    }
  });


  /* DELETE new internship */
router.delete('/deleteNewInternship/:id', async function(req, res, next) {
    try {
      res.json(await availableInternship.deleteInternship(req.params.id));
    } catch (err) {
      console.error(`Error while deleting new internship`, err.message);
      next(err);
    }
  });

module.exports = router;