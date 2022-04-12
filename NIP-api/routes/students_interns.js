const express = require('express');
const router = express.Router();
const studentsIntern = require('../services/students_interns');
const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv').parse;

//Fields to show for the exel document
const fields = [

  {
      label: 'Organization/ company and town', // Optional, column will be labeled 'path.to.something' if not defined)
      value: 'company', // data.path.to.something
      // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
  },


  {
      label: 'Student fullname', // Optional, column will be labeled 'path.to.something' if not defined)
      value: 'firstname, surname', // data.path.to.something
      // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
  },
  {
      label: 'Student Number', // Optional, column will be labeled 'path.to.something' if not defined)
      value: 'student_number', // data.path.to.something
      // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
  },
  {
    label: 'Institution', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'institution', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Field of Study', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'field_of_study', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Student Email address', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'student_email', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Student Phone Number', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'student_phoneNumber', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Admission', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'admission', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Completion', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'completion', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
{
    label: 'Student Document', // Optional, column will be labeled 'path.to.something' if not defined)
    value: 'student_document', // data.path.to.something
    // default: 'N/A' // default if value is not found (Optional, overrides `defaultValue` for column)
},
];

var multer = require('multer');

var storage_product = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './documents/student_documents');
    // callback(null, '../frontend/src/assets/documents/students/');

    
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

    if(req.file) {
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
      town_city: req.body.town_city,
      company_email: req.body.company_email,
      company_registrationNo: req.body.company_registrationNo,
      internship_id: req.body.internship_id,
      admission: req.body.admission,
      completion: req.body.completion,
      student_document: req.file.filename
      
    }


    try {
      res.json(await studentsIntern.newStudentInterns(student_details));
    }
     catch (err) {
      console.error(`Error while submitting new student`, err.message);
      next(err);

    }

  }

  else if (!req.file) {
    return res.send('Please select a pdf file for the internship to upload');
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



//update student who completed their internship
  router.put('/updateStudentCompleted/:id', upload_product.single('student_completion_report'), async function(req, res, next) {

    if(req.file) {
    const student_details = {
      comments: req.body.comments,
      completion: req.body.completion,
      student_completion_report: req.file.filename
      
    }



    try {
      res.json(await studentsIntern.updateStudentCompleted(req.params.id, student_details));
    }
     catch (err) {
      console.error(`Error while updating student details`, err.message);
      next(err);

    }

  }

  else if (!req.file) {
    return res.send('Please select a pdf file report for the student to upload');
}
    });
  

  
    /* update student details */
  
  router.put('/updateStudentDetails/:id', async function(req, res, next) {

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
      town_city: req.body.town_city,
      company_email: req.body.company_email,
      company_registrationNo: req.body.company_registrationNo,
      admission: req.body.admission,
      completion: req.body.completion,
      student_document: req.body.student_document
      
    }

      try {
        res.json(await studentsIntern.updateStudentDetails(req.params.id, student_details));
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


         //get students by company
  router.post('/getAllInternsByOrganization', async function(req, res, next) {
  try {
    res.json(await  studentsIntern.getAllInternsByOrganization(req.body.registration_number));
  } catch (err) {
    console.error(`Error while getting email`, err.message);
    next(err);
  }
});


         //get total pending students per company
         router.post('/getAllPendingInternsByOrganization', async function(req, res, next) {
          try {
            res.json(await  studentsIntern.getAllPendingInternsByOrganization(req.body.registration_number));
          } catch (err) {
            console.error(`Error while getting company registration number`, err.message);
            next(err);
          }
        });

         //get total students per company
         router.post('/getTotalInternsPerOrganization', async function(req, res, next) {
          try {
          res.json(await  studentsIntern.getTotalInternsPerOrganization(req.body.registration_number));
          } catch (err) {
            console.error(`Error while getting email`, err.message);
            next(err);
          }
        });




         //get admitted students by company
         router.post('/getAllAdmittedInternsPerOrganization', async function(req, res, next) {
          try {
            res.json(await  studentsIntern.getAllAdmittedInternsPerOrganization(req.body.registration_number));
          } catch (err) {
            console.error(`Error while getting email`, err.message);
            next(err);
          }
        });


            //get total admitted students by company
            router.post('/getTotalAdmittedInternsPerOrganization', async function(req, res, next) {
              try {
                res.json(await  studentsIntern.getTotalAdmittedInternsPerOrganization(req.body.registration_number));
              } catch (err) {
                console.error(`Error while getting email`, err.message);
                next(err);
              }
            });
            

            //get students who are not admitted by company
            router.post('/getAllNotAdmittedInternsPerOrganization', async function(req, res, next) {
              try {
                res.json(await  studentsIntern.getAllNotAdmittedInternsPerOrganization(req.body.registration_number));
              } catch (err) {
                console.error(`Error while getting the list`, err.message);
                next(err);
              }
            });

            
            
            //get students who have completed their internship per organization
            router.post('/getAllCompletedInternsPerOrgan', async function(req, res, next) {
              try {
                res.json(await  studentsIntern.getAllCompletedInternsPerOrgan(req.body.registration_number));
              } catch (err) {
                console.error(`Error while getting the list`, err.message);
                next(err);
              }
            });

   //get total students who are not admitted by company
   router.post('/getTotalNotAdmittedInternsPerOrganization', async function(req, res, next) {
    try {
      res.json(await  studentsIntern.getTotalNotAdmittedInternsPerOrganization(req.body.registration_number));
    } catch (err) {
      console.error(`Error while getting the list`, err.message);
      next(err);
    }
  });

               //Download student route
 router.post('/download', async function(req, res, next) {
  try {


    const file = `./documents/student_documents/${req.body.student_document}`;
    res.download(file); // Set disposition and send it.

  } catch (err) {
    console.error(`Error while downloading file`, err.message);
    next(err);
  }
});
  
       /* GET get total students still pending */
       router.get('/getAllPendingInterns', async function(req, res, next) {
        try {
          res.json(await studentsIntern.getAllPendingInterns(req.query.page));
        } catch (err) {
          console.error(`Error while getting the list `, err.message);
          next(err);
        }
      });



        /* GET get total students not admmitted. */
        router.get('/getAllNotAdmittedInterns', async function(req, res, next) {
          try {
            res.json(await studentsIntern.getAllNotAdmittedInterns(req.query.page));
          } catch (err) {
            console.error(`Error while getting the list `, err.message);
            next(err);
          }
        });


              /* GET total students admmitted. */
        router.get('/getAllAdmittedInterns', async function(req, res, next) {
          try {
            res.json(await studentsIntern.getAllAdmittedInterns(req.query.page));
          } catch (err) {
            console.error(`Error while getting the list `, err.message);
            next(err);
          }
        });


                /* GET total students completed. */
        router.get('/getAllCompletedInterns', async function(req, res, next) {
          try {
            res.json(await studentsIntern.getAllCompletedInterns(req.query.page));
          } catch (err) {
            console.error(`Error while getting the list `, err.message);
            next(err);
          }
        });

                  /* GET total students completed. */
    //  router.get('/downloadStudentInterns', async function(req, res, next) {
    //       try {
    //         res.json(await studentsIntern.downloadStudentInterns(req.query.page));
    //       } catch (err) {
    //         console.error(`Error while getting the list `, err.message);
    //         next(err);
    //       }
    //     });




        router.get('/download1', async (req, res, next) => {

          // var token = req.headers["authorization"];
          // jwt.verify(token, config.secret, (err, authorizedData) => {
          //     if (err) {
          //         //If error send Forbidden (403)
          //         // console.log("ERROR: Could not connect to the protected route");
          //        return res.sendStatus(403).json({ success: false, msg: 'user not authenticated' });
          //    } else {
        
          try {
            res.json(await studentsIntern.getAllPendingInterns(students_interns)) 
                  if (err)
                      next(err);
              
                  csv = json2csv(( students_interns), { fields });
      
                  //declaring the path for the csv file and its name
                  const filePath = path.join(__dirname, "..", "reports", "exports", "All Pending Students" + ".csv")
                  fs.writeFile(filePath, csv, function (err) {
                      if (err) {
                          return res.json(err).status(500);
                      }
                      else {
      
                          try {
                              //send the response of the file created
                              return res.sendFile(path.join(__dirname, `../reports/exports/All Pending Students.csv`));
      
                          } catch (error) {
                              next(error)
                          }
                      }
                  });
              
          } catch (error) {
              return res.status(500).json({ errmsg: error });
          }
          //    }
          // });
      
      });


  module.exports = router;