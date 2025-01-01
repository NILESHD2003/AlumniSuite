const otpMail = (otp: string, instituteName: string): string => {
  // OTP is a string of 6 characters
  const otpArray = otp.split('');

  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AlumniSuite</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@600&display=swap"
        rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            user-select: none;
        }

        .container {
            max-width: 600px;
            margin: 0 auto 20px;
            padding: 20px;
        }

        .header {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
        }

        .golden-text {
            color: #FCA311;
        }

        .message {
            text-align: left;
            font-size: 16px;
            line-height: 1.5;
            color: #14213D;
        }

        .message p {
            line-height: 1;
            margin: 0 0 1.5em 0;
        }

        .otp-container {
            text-align: center;
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .otp-box {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-color: #FFFFFF;
            border: 2px solid #14213D;
            border-radius: 8px;
            margin: 5px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            line-height: 38px;
            user-select: text;
        }

        .otp-container .dash {
            display: inline-block;
            width: 20px;
            text-align: center;
            font-size: 18px;
            color: #14213D;
            margin: 0 5px;
        }

        .footer {
            text-align: center;
            width: 100%;
            background-color: #FCA311;
            color: #14213D;
            font-size: 12px;
            border-radius: 0 0 10px 10px;
        }

        .logo {
            width: 150px;
            height: auto;
            margin: 10px auto;
            padding: 0;
            display: block;
        }
    </style>
    <script>
        const otp = "${otp}";

        function copyOTP() {
            navigator.clipboard.writeText(otp).then(() => {
                alert("OTP copied to clipboard!");
            }).catch(err => {
                console.error('Failed to copy OTP: ', err);
            });
        }
    </script>
</head>

<body>
    <div class="container">
        <div class="header">
            <img class="logo" src="https://i.postimg.cc/DfQ6QwpM/1AB272.png" alt="logo">
        </div>
        <div class="body">
            <div class="message">
                <p>
                    Dear <span class="golden-text">${instituteName}</span> Team,
                </p>
                <p>
                    <strong>Welcome to AlumniSuite!</strong> We're thrilled to have you as part of our community.
                </p>
                <p>
                    To activate your account and start inviting students and alumni, please verify your email address by
                    entering the One-Time Password (OTP) provided below:
                </p>
                <div class="otp-container golden-text">
                    <span class="otp-box" onclick="copyOTP()">${otpArray[0]}</span>
                    <span class="otp-box" onclick="copyOTP()">${otpArray[1]}</span>
                    <span class="otp-box" onclick="copyOTP()">${otpArray[2]}</span>
                    <span class="otp-box" onclick="copyOTP()">${otpArray[3]}</span>
                </div>
                <p>
                    This code is valid for the next 10 minutes. If you did not initiate this registration, please ignore
                    this email.
                </p>
                <p>
                    Once your email is verified, you can proceed to access all the features available for your
                    institute.
                </p>
                <p>
                    If you have any questions or need assistance, please don't hesitate to reach out to our support team
                    at <a href="mailto:deshpandenilesh2003@gmail.com">deshpandenilesh2003@gmail.com</a>.
                </p>
                <p style="line-height: 2;">
                    Thank you for choosing AlumniSuite!
                </p>
                <p style="line-height: 0;">Best Regards,</p>
                <p><strong>AlumniSuite</strong></p>
            </div>
        </div>
        <div class="footer">
            <p style="font-size: medium;">&copy; 2024 AlumniSuite. All rights reserved.</p>
        </div>
    </div>
</body>

</html>`;
};

export default otpMail;
