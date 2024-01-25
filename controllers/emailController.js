const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const sendMail = async (req, res) => {
    const dog = req.body.dog;
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'david1stankoski@gmail.com',
            pass: 'tewv qwcc xfga pyxl'
        }
    });
    let html = (fs.readFileSync(path.join(__dirname, "..", "public", `${dog}.html`), { encoding: 'utf-8', flag: 'r' }));




 

    var mailOptions = {
        from: 'duricicsolutions@gmail.com',
        to: 'jhachem@rochesteru.edu',
        subject: `Welcome to Happy Paws`,
        html: html,
        attachments:[
            {
                filename: `${dog}.jpg`,
                path: `./images/${dog}.jpg`,
                cid:'img'
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return res.sendStatus(200);
}

module.exports = { sendMail }