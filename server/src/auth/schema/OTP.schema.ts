import mongoose, { Schema } from 'mongoose';
import mailSender from '../../mailSender';
import otpMail from '../../utils/mail/otpMail.mail';

// Define the schema
const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10, // Auto-delete after 5 minutes
  },
});

// Define a function to send emails
async function sendVerificationEmail(
  email: string,
  otp: string,
  hostName: string,
): Promise<void> {
  try {
    const mailResponse = await mailSender(
      email,
      'Verification Email',
      otpMail(otp, hostName),
    );
    console.log('Email sent successfully: ', mailResponse.response);
  } catch (error) {
    console.log('Error occurred while sending email: ', error);
    throw error;
  }
}

// Add a pre-save hook to send email
OTPSchema.pre('save', async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp, this.hostName);
  }
  next();
});

// Create the model with Mongoose
const OTP = mongoose.model('OTP', OTPSchema);

export default OTP;
