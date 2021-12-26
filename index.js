const express = require('express')
const app = express()
const fs = require('fs')
const storage = require('./tasks.json')

// Setting static files
    app.use(express.static(__dirname + '/public'))

// Parse URL-encoded bodies (as sent by HTML forms)
    app.use(express.urlencoded())

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

app.get('/delete/:id', (req, res) => {
    let data = storage
    
    for(let i = 0 ; i < data.tasks.length ; i++){
        if(String(data.tasks[i].id) === String(req.params.id)){
            console.log(data.tasks[i], ' <- ITEM DELETADO')
            data.tasks.splice(i, 1)
        }
    }
    
    fs.writeFile(__dirname + "/tasks.json", JSON.stringify(data), 
        err => {
            if(err) throw err
        }
    )
    res.redirect('/')
})

app.post('/add', (req, res) => {
    let newID = storage.lastID + 1
    let { nome, descricao, prazo } = req.body
    let newTask = new Task(nome, descricao, prazo, false, newID)

    let data = storage

    data.tasks.push(newTask)
    data.lastID++

    fs.writeFile(__dirname + "/tasks.json", JSON.stringify(data),
        err => {
            if(err) throw err
        }
    )
    res.redirect('/')
})

app.get('/changeStatus/:id', (req, res) => {
    let data = storage

    for(let i = 0 ; i < data.tasks.length ; i++){
        if(String(data.tasks[i].id) === String(req.params.id)){

            console.log(data.tasks[i], ' <- Status alterado')


            if(data.tasks[i].status === true){

                data.tasks[i].status = false

            } else if(data.tasks[i].status === false){

                data.tasks[i].status = true

            }
        }
    }

    fs.writeFile(__dirname + "/tasks.json", JSON.stringify(data), 
        err => {
            if(err) throw err
        }
    )
    res.redirect('/')
})


app.listen(3000, () => {
    console.log('The server is running on the port 3000!')
})



/*

Dependences
Express --save
body-parser

*/