const express = require('express');
const app = express(); 

const port = 8080;

app.get('/', (req, res) => {
    res.json({
        "Hello": "There"
    })
})


app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`)
})