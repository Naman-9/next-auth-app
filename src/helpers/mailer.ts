// domain.com/verifyToken/asfdisdjf         -- server Component
// domain.com/verifyToken?token=asfdisdjf   -- Client Component

import User from '@/app/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcrytjs';

// can detect emailType -- enum for that  -- preferred way
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create Hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      // do this with enum
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    let transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_TRAP_USER,
        pass: process.env.EMAIL_TRAP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_TRAP_ID,
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your Password',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

  } catch (e: any) {
    throw new Error(e.message);
  }
};
