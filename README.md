# Personal Website

A personal portfolio website built with HTML, CSS, and JavaScript, with a Node.js backend.

## Deployment Guide for Vercel

### Prerequisites
- A Vercel account
- Google reCAPTCHA account with site key and secret key
- Gmail account with App Password (not your regular password)

### Setup Environment Variables on Vercel
When deploying to Vercel, make sure to set the following environment variables in the Vercel project settings:

1. `NODE_ENV`: Set to "production"
2. `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA secret key
3. `EMAIL_USER`: Your Gmail address
4. `EMAIL_PASS`: Your Gmail App Password (not your regular password)
5. `RECIPIENT_EMAIL`: Email where you want to receive contact form submissions

### Steps to Deploy

1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Configure the build settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `.`
   - Install Command: `npm install`
4. Add environment variables in the Vercel project settings
5. Deploy

### Troubleshooting

#### CORS Issues
If you're facing CORS issues, make sure your Vercel domain is correctly listed in the CORS configuration in `server.js`.

#### reCAPTCHA Not Working
- Verify that your reCAPTCHA site key (in HTML) and secret key (in environment variables) are correct
- Make sure the domain is added to your reCAPTCHA settings in Google Console

#### Email Not Working
- Check if your Gmail app password is correctly set
- Ensure you're using an app password and not your regular Gmail password
- Verify that Gmail's "less secure apps" setting is properly configured

## Local Development

### Installation
```bash
npm install
```

### Running the Server
```bash
npm run dev
```

This will start the development server at http://localhost:3003

## Technologies Used
- HTML/CSS/JavaScript
- Node.js/Express
- Nodemailer
- Google reCAPTCHA v2
