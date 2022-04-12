const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const path = require('path');
var email = '';
const config = require('../services/db');


//roter to send an email to institutions
router.post('/sendemailplain', async (req, res, next) => {


    // var token = req.headers["authorization"];
    // jwt.verify(token, config.secret, async (err, authorizedData) => {
    //     if (err) {
    //         //If error send Forbidden (403)
    //         // console.log("ERROR: Could not connect to the protected route");
    //         return res.json({ success: false, msg: 'user not authenticated' });
    //     } else {
            try {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                // let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: '172.16.20.156',
                    port: 25,
                    // true for 465, false for other ports
                    tls: {
                        rejectUnauthorized: false
                    }

                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `${req.body.email_from}`, // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: `${req.body.email_subject}`, // Subject line
                    text: `${req.body.message}`,

                }).then(result => {
                    // console.log("Message sent: %s");
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

                    res.json({ success: true, msg: 'email sent successfully' });

                }).catch(err => next(err));

            } catch (err) {
                next(err);
            }
    //     }
    // });
});

module.exports = router;
