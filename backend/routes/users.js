const { application } = require('express');
var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer")
const details = require("../details.json")

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.json('ceci est un test')
});

router.get('/restid/:id', function(req, res, next) {
  
  res.json(req.params.id);
});

router.post("/sendmail", function(req, res){
  let user = req.body;
  sendMail(user, info=>{
    console.log(`the email has been send and the id is ${info.messageId}`);
    res.send(info)
  })
})



async function sendMail(user, callback){
  console.log(user);
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.gmail.com",
    port: 587,
    secure: false,
    auth : {
      user: details.user,
      pass: details.pass
    }
  });

  let mailOptions = {
    from: "ideamiage@gmail.com",
    to: user._email,
    subject: "Nouveau passager",
    html: `<h1> Bonjour ${user._name}</h1><br>
    Vous avez un nouveau passager sur votre trajet`
  }; 
  //smtp need to be able on both side

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}




module.exports = router;
