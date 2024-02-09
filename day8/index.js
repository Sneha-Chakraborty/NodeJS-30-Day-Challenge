const express = require("express");
const app = express();

app.get('/positive', positiveIntegerHandler);

function positiveIntegerHandler(req, res, next) {
    const num = parseInt(req.query.number);
    if(Number.isInteger(num) && num>=0){
        res.send("Correct type of Integer!");
    }
    else{
        const error = new Error("Error in type of Number!");
        error.status = 400;
        next(error); 
    }
}

app.use('/positive', (err, req, res, next) => {
    res.status(err.status || 500).send("Error: " + err.message);
});

//start the express server.
app.listen(3000, ()=>{
    console.log("Server running on port : 3000!");
});

