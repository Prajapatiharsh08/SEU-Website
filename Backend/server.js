import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { body, validationResult } from "express-validator"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load environment variables
dotenv.config()

const app = express()
const PORT = 9999

// Security middleware
app.use(helmet())
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173", // Your frontend URL
        methods: ["POST"],
        credentials: true,
    }),
)

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs per IP
    message: "Too many requests from this IP, please try again later.",
})

// Apply rate limiting to contact form endpoint
app.use("/api/contact", limiter)

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bhaveshvishwakarma223@gmail.com", // Your Gmail address
        pass: "mfhy gwhi shnr vgfu", // Your app password
    },
})

// Validation middleware
const validateContactForm = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
]

// Generate futuristic email template
const generateEmailTemplate = (formData) => {
    const { name, email, phone, subject, message } = formData
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    })

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Roboto:wght@400;500;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', Arial, sans-serif;
          background-color: #000;
          color: #fff;
          font-weight: 500;
        }
        
         .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0a1a;
            border: 1px solid #0066ff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 102, 255, 0.5);
        }

        .header {
            background: linear-gradient(135deg, #000428, #004e92);
            padding: 30px;
            text-align: center;
            border-bottom: 2px solid #0066ff;
        }

        .logo-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }

        .logo-image {
            max-height: 120px;
            margin-right: 15px;

        }

        .logo-text {
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: auto;
            text-shadow: 0 0 10px rgba(0, 102, 255, 0.7);
        }

        .tagline {
            font-size: 16px;
            color: #99ccff;
            margin-top: 0px;
            letter-spacing: 1px;
            font-weight: 600;
        }

        .content {
            padding: 30px;
            background-color: #0a0a1a;
        }

        .title {
            font-family: 'Montserrat', sans-serif;
            font-size: 22px;
            font-weight: 800;
            color: #0099ff;
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #0066ff;
            letter-spacing: 0.5px;
        }

        .info-box {
            background-color: rgba(0, 20, 40, 0.5);
            border-left: 3px solid #0099ff;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }

        .info-label {
            font-size: 13px;
            text-transform: uppercase;
            color: #0099ff;
            margin-bottom: 5px;
            letter-spacing: 1px;
            font-weight: 700;
        }
        
        .info-value {
          font-size: 16px;
          color: #fff;
          margin: 0;
          word-break: break-word;
          font-weight: 600;
        }
        
        .message-box {
          background-color: rgba(0, 20, 40, 0.3);
          border: 1px solid #0066ff;
          border-radius: 5px;
          padding: 20px;
          margin-top: 30px;
        }
        
        .message-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0099ff;
          margin-top: 0;
          margin-bottom: 15px;
        }
        
        .message-content {
          font-size: 15px;
          color: #ffffff;
          line-height: 1.6;
          margin: 0;
          font-weight: 500;
        }
        
        .timestamp {
          text-align: right;
          font-size: 12px;
          color: #888;
          margin-top: 30px;
          font-style: italic;
          font-weight: 600;
        }
        
        .footer {
          background-color: #000428;
          padding: 20px;
          text-align: center;
          border-top: 2px solid #0066ff;
        }
        
        .footer-text {
          font-size: 12px;
          color: #99ccff;
          margin: 0;
          font-weight: 600;
        }
        
        .highlight {
          color: #00ccff;
          font-weight: 700;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #0066ff, transparent);
          margin: 25px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-container">
            <img src="cid:company-logo" class="logo-image" alt="Sudarsana Entrepreneurs Units Logo">
            <h1 class="logo-text">Sudarsana Entrepreneurs Units PVT LTD</h1>
          </div>
          <p class="tagline">Building Future, Delivering Excellence</p>
        </div>
        
        <div class="content">
          <h2 class="title">New Contact Form Submission</h2>
          
          <div class="info-box">
            <p class="info-label">Name</p>
            <p class="info-value">${name}</p>
          </div>
          
          <div class="info-box">
            <p class="info-label">Email</p>
            <p class="info-value">${email}</p>
          </div>
          
          <div class="info-box">
            <p class="info-label">Phone</p>
            <p class="info-value">${phone || "Not provided"}</p>
          </div>
          
          <div class="info-box">
            <p class="info-label">Subject</p>
            <p class="info-value highlight">${subject}</p>
          </div>
          
          <div class="divider"></div>
          
          <div class="message-box">
            <h3 class="message-title">Message Content</h3>
            <p class="message-content">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p class="timestamp">Submitted on ${currentDate} at ${currentTime}</p>
        </div>
        
        <div class="footer">
          <p class="footer-text">© ${new Date().getFullYear()} Sudarsana Entrepreneurs Units. All rights reserved.</p>
          <p class="footer-text">This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Contact form endpoint
app.post("/api/contact", validateContactForm, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        const formData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone || "Not provided",
            subject: req.body.subject,
            message: req.body.message,
        }

        // Email content with new template
        const mailOptions = {
            from: `"Sudarsana Entrepreneurs Units" <${formData.email}>`,
            to: "bhaveshvishwakarma223@gmail.com", // RECIPIENT_EMAIL
            subject: `New Contact Form Submission: ${formData.subject}`,
            html: generateEmailTemplate(formData),
            replyTo: formData.email,
            attachments: [
                {
                    filename: 'company-logo.png',
                    path: __dirname + '/public/logo.png',
                    cid: 'company-logo' // same cid value as in the html img src
                }
            ]
        }

        // Send email
        await transporter.sendMail(mailOptions)

        // Return success response
        res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!",
        })
    } catch (error) {
        console.error("Error sending email:", error)
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later.",
        })
    }
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
