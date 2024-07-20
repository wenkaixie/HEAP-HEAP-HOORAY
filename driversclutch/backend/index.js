const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8001;

const { db } = require("./firebase/firebase.js");
// const authMiddleware = require('./middlewares/authMiddleware');
// const errorHandler = require('./middlewares/errorMiddleware');
const logger = require("./middlewares/loggerMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logging middleware
app.use(bodyParser.json());
app.use(cors({
	origin: "https://driversclutch.vercel.app",
	methods: 'GET,POST,PUT,DELETE',
	credentials: true, // to allow cookies to be sent along with requests
  }));

//server check
app.listen(PORT, (error) => {
	if (!error)
		console.log(
			"Server is Successfully Running, and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});

//routes
app.get("/", (req, res) => {
	res.status(200).json("Welcome, your app is working well");
});

//authentication
app.use("/auth", require("./routes/auth"));

// for path /students/privateInstructors
app.use(
	"/students/privateInstructors",
	require("./routes/instructorListRouter.js")
); //check naming with claire

// for path /instructors/availability
app.use(
	"/instructors/availability",
	require("./routes/instructorAvailabilityRouter.js")
); //check naming with zuwei

// for path /students/booking
app.use("/students/booking", require("./routes/lessonBookingRouter.js"));

// for path /students/homepage
app.use("/students/homepage", require("./routes/studentHomeRouter.js"));

//for path /students/profile
app.use("/students/profile", require("./routes/studentProfileRouter.js"));

//for path /instructors/profile
app.use("/instructors/profile", require("./routes/instructorProfileRouter.js"));

// for path /instructors/homepage
app.use("/instructors/homepage", require("./routes/instructorHomeRouter.js"));

// for path /instructors/studentList
app.use("/instructors/studentList", require("./routes/studentListRouter.js"));

// for path /students/balance
app.use("/students/balance", require("./routes/balanceRouter.js"));

// for path /students/theoryTest
app.use("/students/theoryTest", require("./routes/theoryTestRouter.js"));

app.use("/webscraping", require("./routes/bookingRouter.js"));

module.exports = app;
