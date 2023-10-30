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
        pass:"owsm xohh ntri emot"
    }
});
const handlebarOptions={
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

transporter.use('compile', hbs(handlebarOptions));

module.exports=transporter;