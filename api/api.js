const express = require('express')
const app = express()
const fs = require('fs')
const storage = require('./tasks.json')

class Task {
    constructor(nome, descricao, prazo, status, id) {
        this.nome = nome,
        this.descricao = descricao,
        this.prazo = prazo,
        this.status = status
        this.id = id
    }
}

app.get('/', (req, res) => {
    return res.send(storage)
})

app.get('/delete', (req, res) => {
    let data = storage
    data.tasks.filter(
        task => {
            return task.id !== req.query.id
        }
    )
    console.log(data.tasks)

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

app.listen(5000, console.log('The API is running on port 5000!'))