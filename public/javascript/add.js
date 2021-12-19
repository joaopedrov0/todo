function add(){
    let nome = document.querySelector('#nome').value
    let descricao = document.querySelector('#descricao').value
    let prazo = document.querySelector('#prazo').value

    let query = '/?nome=' + nome
    if(descricao) {query += '&descricao=' + descricao}
    if(prazo) {query += '&prazo=' + prazo}

    takeTasks(query)
}