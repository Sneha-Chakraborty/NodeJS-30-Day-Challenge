const express = require('express');
const path = require('path');

const app = express();

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
// Serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/styles/style.css', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'styles', 'style.css'));
});


app.listen(3000, ()=>{
    console.log("Express Server running on port : 3000!");
});



