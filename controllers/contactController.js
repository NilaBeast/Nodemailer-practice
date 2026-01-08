const transporter = require("../config/mailer");
const dotenv = require("dotenv");

dotenv.config();

const sendContactMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New Contact Message",
      html: `
        <h3>New Contact Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("MAIL ERROR FULL:", error);

    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};

module.exports = { sendContactMail };
