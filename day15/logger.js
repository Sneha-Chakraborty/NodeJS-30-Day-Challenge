const express = require('express');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function loggingMiddleware(req, res, next){
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const headers = req.headers;
    const reqBody = req.body;

    console.log(`timestamp : ${timestamp}`);
    console.log(`method : ${method}`);
    console.log(`url : ${url}`);
    console.log(`headers : ${JSON.stringify(headers)}`);
    console.log(`reqBody : ${JSON.stringify(reqBody)}`);
    // console.log("req : ", req);

    next();
}

app.use(loggingMiddleware);


app.listen(3000, ()=>{
    console.log("ExpressJS Server running on Port : 3000!");
});

