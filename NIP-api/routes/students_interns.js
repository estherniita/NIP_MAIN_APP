const express = require('express');
const router = express.Router();
const studentsIntern = require('../services/students_interns');
var multer = require('multer');

var storage_product = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, '../frontend/src/assets/documents/students/');
    
      //callback(null, './uploads/img/team');
      //Use next line in production change path to ../public/assets/profiles/...
      //!callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
      const prefix = "Student_NIP";
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
    
      if (file.mimetype == "application/pdf" ) {
          cb(null, true);
      } else {
          cb(null, false); 
          return cb(new Error('Allowed only .pdf files'));
      }
  },
  
});




  /* POST new student */

  router.post('/newStudentInterns', upload_product.single('student_document'), async function(req, res, next) {
    const student_details = {
      firstname: req.body.firstname,
      surname: req.body.surname,
      idNo_or_passportNo: req.body.idNo_or_passportNo,
      student_number: req.body.student_number,
      student_email: req.body.student_email,
      student_phoneNumber: req.body.student_phoneNumber,
      institution: req.body.institution,
      field_of_study: req.body.field_of_study,
      internships_name: req.body.internships_name,
      company: req.body.company,
      company_email: req.body.company_email,
      company_registrationNo: req.body.company_registrationNo,
      admission: req.body.admission,
      completion: req.body.completion,
      student_document: req.file.filename
      
  
    }
    try {
      res.json(await studentsIntern.newStudentInterns(student_details));
    } catch (err) {
      console.error(`Error while submitting new student`, err.message);
      next(err);
    }
    });
  


/* GET get the list of all submitted student. */
router.get('/getAllStudentInterns', async function(req, res, next) {
    try {
      res.json(await studentsIntern.getAllStudentInterns(req.query.page));
    } catch (err) {
      console.error(`Error while getting the list `, err.message);
      next(err);
    }
  });


  /* GET get the list of all submitted student. */
router.get('/downloadStudentInterns', async function(req, res, next) {
  try {
    res.json(await studentsIntern.downloadStudentInterns());
  } catch (err) {
    console.error(`Error while downloading `, err.message);
    next(err);
  }
});
  
  
    
  
  /* GET the student by institution name. */
  router.get('/getStudentByInstitution', async function(req, res, next) {
    try {
      res.json(await studentsIntern.getAllStudentByInstitution(req.query.page));
    } catch (err) {
      console.error(`Error while getting the list of institution`, err.message);
      next(err);
    }
  });


  

  
    /* update student details */
  
  router.put('/updateStudentDetails/:id', async function(req, res, next) {
      try {
        res.json(await studentsIntern.updateStudentDetails(req.params.id, req.body));
      } catch (err) {
        console.error(`Error while updating updating details`, err.message);
        next(err);
      }
    });
  
  
    /* DELETE student */
  router.delete('/deleteStudent/:id', async function(req, res, next) {
      try {
        res.json(await studentsIntern.deleteStudent(req.params.id));
      } catch (err) {
        console.error(`Error while deleting student`, err.message);
        next(err);
      }
    });

    /* GET get the list of all IUM student. */
router.get('/getIUMStudentInterns', async function(req, res, next) {
  try {
    res.json(await studentsIntern.getIUMStudents(req.query.page));
  } catch (err) {
    console.error(`Error while getting the list `, err.message);
    next(err);
  }
});


    /* GET get the list of all NUST student. */
    router.get('/getNUSTStudentInterns', async function(req, res, next) {
      try {
        res.json(await studentsIntern.getNUSTStudents(req.query.page));
      } catch (err) {
        console.error(`Error while getting the list `, err.message);
        next(err);
      }
    });


    /* GET get the list of all NUST student. */
    router.get('/getNIMTStudentInterns', async function(req, res, next) {
      try {
        res.json(await studentsIntern.getNIMTStudents(req.query.page));
      } catch (err) {
        console.error(`Error while getting the list `, err.message);
        next(err);
      }
    });


      /* GET get the list of all UNAM student. */
      router.get('/getUNAMStudentInterns', async function(req, res, next) {
        try {
          res.json(await studentsIntern.getUNAMStudents(req.query.page));
        } catch (err) {
          console.error(`Error while getting the list `, err.message);
          next(err);
        }
      });


    
      /* GET get the list of all VTC student. */
      router.get('/getVTCStudentInterns', async function(req, res, next) {
        try {
          res.json(await studentsIntern.getVTCStudents(req.query.page));
        } catch (err) {
          console.error(`Error while getting the list `, err.message);
          next(err);
        }
      });


        /* GET get total students grouped by institution and company. */
        router.get('/getAllStudentsByInstiOrga', async function(req, res, next) {
          try {
            res.json(await studentsIntern.getAllStudentsByInstiOrga(req.query.page));
          } catch (err) {
            console.error(`Error while getting the list `, err.message);
            next(err);
          }
        });


         /* GET get total students grouped by institution and company. */
         router.get('/getAllStudentsByOrga', async function(req, res, next) {
          try {
            res.json(await studentsIntern.getAllStudentsByOrga(req.query.page));
          } catch (err) {
            console.error(`Error while getting the list `, err.message);
            next(err);
          }
        });
      
  
  
  module.exports = router;