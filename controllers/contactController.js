const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // Send email using Brevo Email API (HTTPS – port 443)
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Contact Form",
          email: process.env.MAIL_TO, // must be a verified/safe email
        },
        to: [
          {
            email: process.env.MAIL_TO,
          },
        ],
        subject: "New Contact Message",
        htmlContent: `
          <h3>New Contact Submission</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        timeout: 10000, // ⏱ prevents hanging
      }
    );

    // Success response
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(
      "BREVO API ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

module.exports = { sendContactMail };
