const express = require('express');
const app = express();
const PORT = 5000;
const {db} = require('./firebase/firebase.js')

const authRoutes = require('./authentication/routes/auth');
const authMiddleware = require('./authentication/middlewares/authMiddleware');
const errorHandler = require('./authentication/middlewares/errorMiddleware');
const logger = require('./authentication/middlewares/loggerMiddleware');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Logging middleware

//routes
app.use('/auth', authRoutes); // Mount auth routes on /auth


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use(express.json())

//health check
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is up and running!"
    })
})