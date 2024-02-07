const express = require('express');
const app = express();

function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`);
    next();
}

app.use(requestLoggerMiddleware);

app.get('/welcome', (req, res)=>{
    res.send(`Hello and Welcome ${req.query.name}!`);
});

app.listen(3000, ()=>{
    console.log("Port listening on 3000!");
});

