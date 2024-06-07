const express = require('express');

const app = express();
const PORT = 3000;
const {db} = require('./firebase.js')

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use(express.json())