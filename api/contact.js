const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      // Get form data
      const { name, email, message, 'g-recaptcha-response': recaptchaResponse } = req.body;
      
      // Validate reCAPTCHA
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
      if (!recaptchaSecret) {
        console.error('Missing reCAPTCHA secret key!');
        return res.status(500).json({
          success: false,
          errors: ['Server configuration error']
        });
      }
      
      const recaptchaVerification = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`
      );
      
      if (!recaptchaVerification.data.success) {
        return res.status(400).json({
          success: false,
          errors: ['reCAPTCHA verification failed, please try again']
        });
      }
      
      // Validate form data
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          errors: ['Please fill in all required fields']
        });
      }
      
      // Setup email transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Message from Personal Website - ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
      
      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      return res.status(500).json({
        success: false,
        errors: ['Error sending message, please try again later']
      });
    }
  } else {
    // Handle other methods
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
