const express = require('express')
const app = express()
const fs = require('fs')
const storage = require('./tasks.json')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index.html')
})


class Task {
    constructor(nome, descricao, prazo, status, id) {
        this.nome = nome,
        this.descricao = descricao,
        this.prazo = prazo,
        this.status = status
        this.id = id
    }
}


app.get('/takeAll', (req, res) => {
    return res.send(storage)
})

app.get('/delete', (req, res) => {
    let data = storage
    
    for(let i = 0 ; i < data.tasks.length ; i++){
        if(String(data.tasks[i].id) === String(req.query.id)){
            console.log(data.tasks[i], ' <- ITEM DELETADO')
            data.tasks.splice(i, 1)
        }
    }
    
    fs.writeFile(__dirname + "/tasks.json", JSON.stringify(data), 
        err => {
            if(err) throw err
        }
    )
    res.send(storage)
})

app.get('/add', (req, res) => {
    let newID = storage.lastID + 1
    let { nome, descricao, prazo } = req.query
    let newTask = new Task(nome, descricao, prazo, false, newID)
    let data = storage
    data.tasks.push(newTask)
    data.lastID++
    fs.writeFile(__dirname + "/tasks.json", JSON.stringify(data),
        err => {
            if(err) throw err
        }
    )
    res.send(data)
})


app.listen(3000, () => {
    console.log('The server is running on the port 3000!')
})



/*

Dependences
Express --save

*/