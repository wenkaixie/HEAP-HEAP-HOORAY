const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 5000;
const {db} = require('./firebase/firebase.js')
// const authMiddleware = require('./middlewares/authMiddleware');
// const errorHandler = require('./middlewares/errorMiddleware');
const logger = require('./middlewares/loggerMiddleware');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logging middleware
app.use(bodyParser.json());
app.use(cors());


//server check
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);


//routes
//authentication
app.use('/auth', require('./routes/auth'));

// for path /students/privateInstructors
app.use('/students/privateInstructors', require('./routes/instructorListRouter.js'));  //check naming with claire

// for path /instructors/availability
app.use('/instructors/availability', require('./routes/instructorAvailabilityRouter.js')); //check naming with zuwei

// for path /students/booking
app.use('/students/booking', require('./routes/lessonBookingRouter.js'));

// for path /students/homepage
app.use('/students/homepage', require('./routes/studentHomeRouter.js'));

//for path /students/profile
app.use('/students/profile', require('./routes/studentProfileRouter.js'));