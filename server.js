const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS EXISTS:", !!process.env.MAIL_PASS);
console.log("MAIL_TO:", process.env.MAIL_TO);


const app = express();


app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("Contact API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
