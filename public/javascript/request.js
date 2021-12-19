const baseURL =  'https://3000-ivory-owl-4qjm8vge.ws-us23.gitpod.io/'


const takeTasks = (action) => {
    if(!action){
        action = 'takeAll'
    }

    let request = new XMLHttpRequest()
    request.open('GET', baseURL + action)
    request.responseType = 'json'
    request.send()

    request.onload = () => {
        let tasks = request.response
        console.log(tasks)
        renderTasks(tasks.tasks)
    }
}

const renderTasks = (tasks) => {
    let taskArea = document.querySelector('.task-list')
    for(let i = 0 ; i < tasks.length ; i++) {
        taskArea.innerHTML = `
        
        <div class="task">
            <div class="main">
                <div class="name">${tasks[i].name}</div><div class="status material-icons ${tasks[i].status}"></div>
            </div>
            <hr>
            <div class="descricao">${tasks[i].descricao}</div>
            <div class="footer-task">
                <small class="prazo">${tasks[i].prazo}</small>
                <div class="delete material-icons" onclick="remove(${tasks[i].id})">delete</div>
            </div>
        </div>
        
        ` + taskArea.innerHTML
    }
}