
const nodemailer = require('nodemailer');

const getTransport = () =>{
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        pool: true,
        auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS
        }
    });
}

export const sendHtmlEmail = (email:string,html:any, subject:string = "")  => {
    
    const message = {
        from: process.env.EMAIL_USER, 
        to: email,       
        subject, 
        html
    };

    const transport = getTransport();
    transport.sendMail(message, (err: any, info:any) => {
        transport.close();
        if (err) {
            console.error(err);
        } 
        else {
            console.log(info)
        }
    });
}