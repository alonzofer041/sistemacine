const hbs = require('nodemailer-express-handlebars');
const nodemailer=require("nodemailer");
const path = require('path');
const QRCode = require('qrcode');


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
            /*generateQR:function (data){
                const typeNumber = 4; // Ajustar según tus necesidades
                const errorCorrectionLevel = 'L'; // Ajustar según tus necesidades
                const qr = QRcode(typeNumber, errorCorrectionLevel);
                qr.addData(data);
                qr.make();
                const qrImage = qr.createImgTag();
                return qrImage;
            }*/

        }
    },
    viewPath: path.resolve('./views/'),
}


transporter.use('compile', hbs(handlebarTicket));

module.exports=transporter;