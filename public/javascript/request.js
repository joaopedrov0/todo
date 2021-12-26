const baseURL =  'https://3000-ivory-cockroach-z228y9fy.ws-us25.gitpod.io/takeAll'

// debug variables 
    var tasks


const takeTasks = () => {

    let request = new XMLHttpRequest()

    request.open('GET', baseURL)
    request.responseType = 'json'

    request.send()

    request.onload = () => {

        tasks = request.response

        console.log(tasks)
        renderTasks(tasks.tasks)

    }
}

const renderTasks = (tasks) => {
    let taskArea = document.querySelector('.task-list')
    for(let i = 0 ; i < tasks.length ; i++) {

        if(tasks[i].descricao) descricao = `<div class="descricao">${tasks[i].descricao}</div>`
        if(!tasks[i].prazo) tasks[i].prazo = ''

        taskArea.innerHTML = `
        
        <div class="task">
            <div class="main">
                <div class="name">${tasks[i].nome}</div><a href="/changeStatus/${tasks[i].id}" class="status material-icons ${tasks[i].status}"></a>
            </div>
            <hr>
            <div class="descricao">${tasks[i].descricao}</div>
            <div class="footer-task">
                <small class="prazo">${tasks[i].prazo}</small>
                <a class="delete material-icons" href="/delete/${tasks[i].id}">delete</a>
            </div>
        </div>
        
        ` + taskArea.innerHTML
    }
}