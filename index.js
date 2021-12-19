const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname, '/index.html')
})


app.listen(3000, () => {
    console.log('The server is running on the port 3000!')
})



/*

Dependences
Express --save

*/