const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8001;

const { db } = require("./firebase/firebase.js");
const logger = require("./middlewares/loggerMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logging middleware
app.use(bodyParser.json());

const allowedOrigins = [
    "https://driversclutch.vercel.app",
    "http://localhost:3000",
    "https://heap-heap-hooray-8w28-git-main-wenkais-projects.vercel.app",
    "https://heap-heap-hooray-8w28-q3zsj5v9u-wenkais-projects.vercel.app",
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // to allow cookies to be sent along with requests
};

app.use(cors(corsOptions));

// Enable pre-flight requests for all routes
app.options('*', cors(corsOptions));

// Server check
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else console.log("Error occurred, server can't start", error);
});

// Routes
app.get("/", (req, res) => {
    res.status(200).json("Welcome, your app is working well");
});

// Authentication
app.use("/auth", require("./routes/auth"));

// For path /students/privateInstructors
app.use("/students/privateInstructors", require("./routes/instructorListRouter.js"));

// For path /instructors/availability
app.use("/instructors/availability", require("./routes/instructorAvailabilityRouter.js"));

// For path /students/booking
app.use("/students/booking", require("./routes/lessonBookingRouter.js"));

// For path /students/homepage
app.use("/students/homepage", require("./routes/studentHomeRouter.js"));

// For path /students/profile
app.use("/students/profile", require("./routes/studentProfileRouter.js"));

// For path /instructors/profile
app.use("/instructors/profile", require("./routes/instructorProfileRouter.js"));

// For path /instructors/homepage
app.use("/instructors/homepage", require("./routes/instructorHomeRouter.js"));

// For path /instructors/studentList
app.use("/instructors/studentList", require("./routes/studentListRouter.js"));

// For path /students/balance
app.use("/students/balance", require("./routes/balanceRouter.js"));

// For path /students/theoryTest
app.use("/students/theoryTest", require("./routes/theoryTestRouter.js"));

// For web scraping
app.use("/webscraping", require("./routes/bookingRouter.js"));

module.exports = app;
