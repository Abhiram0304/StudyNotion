const resetPassword = (url) => {
	return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
            .heading{
                text-align:center;
                font-size: 30px;
                font-weight:600;
                margin-bottom:30px;
            }
            .link{
                color:black;
                font-size:32px;
                font-weight:900;
                margin:0px auto;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Reset Password Link</div>
            <div class="body">
                <div class="heading">Click on the below link to reset your password</div>
                <a class="link" href="${url}">CLICK HERE</a>
                </p>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
            
        </div>
    </body>
    
    </html>`; 
};

module.exports = resetPassword;