const nodemailer = require("nodemailer");// để gửi email được

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
        
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

};

module.exports = sendMail;


// var SMPT_HOST = "smtp.gmail.com" : Đây là địa chỉ máy chủ SMTP của Gmail. Đối với việc gửi email thông qua Gmail, thông tin này cần được cung cấp để kết nối tới máy chủ SMTP. 
// var SMPT_PORT = 465 : Đây là cổng mà máy chủ SMTP của Gmail sử dụng để giao tiếp. Cổng 465 thường được sử dụng cho kết nối bảo mật sử dụng SSL/TLS.
// var SMPT_SERVICE ="gmail" : Đây là tên dịch vụ email mà bạn đang sử dụng. Trong trường hợp này, đang sử dụng dịch vụ Gmail.
// var SMPT_MAIL = "tu.nht.61ttql@ntu.edu.vn" : Đây là địa chỉ email nguồn, tức là địa chỉ email mà bạn muốn sử dụng để gửi email.
// var SMPT_PASSWORD = "225698150" : Đây là mật khẩu của địa chỉ email nguồn. Để gửi email, bạn cần cung cấp mật khẩu này để xác thực tài khoản.