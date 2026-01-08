const express = require("express");
const { sendContactMail } = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", sendContactMail);

module.exports = router;
