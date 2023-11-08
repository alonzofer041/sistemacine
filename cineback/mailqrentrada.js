const hbs = require('nodemailer-express-handlebars');
const nodemailer=require("nodemailer");
const path = require('path');

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    // service:"gmail",
    auth:{
        user:"cineflashmid@gmail.com",
        pass:"nutj gkum arkc wfgf"
    }
});
const handlebarTicket={
    viewEngine:{
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
        helpers:{
            link:function(text,url){  
                return "<a class='botonfalso' href='http://" + url + "'>" + text +"</a>";
            }
        }
    },
    viewPath: path.resolve('./views/'),
}

transporter.use('compile', hbs(handlebarTicket));

module.exports=transporter;