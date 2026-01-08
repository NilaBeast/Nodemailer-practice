const express = require("express");
const { sendContactMail } = require("../controllers/contactController");

const router = express.Router();

router.get("/contact", (req, res) => {
  res.send("Contact API is working. Use POST to send mail.");
});

router.post("/contact", sendContactMail);

module.exports = router;
