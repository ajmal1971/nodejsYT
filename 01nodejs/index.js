const express = require("express");

const app = express();
const port = 8000;

// Home
app.get('/', (req, res) => {
    return res.send(`Hello form home page! Your IP - ${req.socket.remoteAddress}`);
})

app.get('/about', (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));