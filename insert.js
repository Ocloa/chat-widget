const insert_div = document.getElementById('insert_div');

async function insert(){
    let response = await (await fetch('http://localhost:5505/widget')).text();
    insert_div.innerHTML = response;
}

insert();