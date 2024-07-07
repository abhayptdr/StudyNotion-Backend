require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
// const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const CourseRoutes = require("./routes/Course");
const paymentRoutes=require('./routes/Payment')

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudnairyconnect } = require("./config/cloudinary"); // Corrected variable name


const PORT = process.env.PORT || 5000;

// Connect to database with error handling
database.connect()
  

app.use(express.json());
app.use(cookieParser());

// CORS configuration with optional origin parsing
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? JSON.parse(process.env.CORS_ORIGIN) : '*',
  credentials: true,
  maxAge: 14400,
};
app.use(cors(corsOptions));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connection
cloudnairyconnect(); // Assuming this function is correctly implemented

app.use("/api/v1/auth", userRoutes);
// Uncomment if paymentRoutes are defined and required
// app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", CourseRoutes);

// Ensure ContactUs route is correctly implemented
app.use("/api/v1/contact", require("./routes/ContactUs"));
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
