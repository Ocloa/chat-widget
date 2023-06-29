const http = require('http');
const path = require('path');
const fs = require('fs');
const pool = require('./pool')
const Router = require('./router');
const PORT = 5505;
const HOST = 'localhost';

let rout = new Router();

let server = http.createServer((req,res) => {

    rout.appendRout('GET', '/widget', widgetForm);
    rout.appendRout('GET', '/wstyles.css', widgetStyles);
    rout.appendRout('GET', '/script.js', widgetScript);
    rout.appendRout('POST', '/submit', submitData);
    rout.appendRout('OPTIONS', '/submit', managePreflightRequest);

    if (req.url.endsWith('.css')){
        res.setHeader('content-type', 'text/css');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Accept, Origin');
    }
    else if (req.url.endsWith('.js')){
        res.setHeader('content-type', 'text/javascript');
    }
    else if (req.url.endsWith('/widget')){
        res.setHeader('content-type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Accept, Origin');
    }

    let name = rout.serveRout(req, res);
    if (typeof name == 'string'){
        const page = fs.createReadStream(path.join(process.cwd(), name));
        page.pipe(res);
    }

});

server.listen(PORT, HOST, () => { console.log(`Сервер запущен: http://${HOST}:${PORT}`); createTable();});

function createTable() {
    pool.query("CREATE TABLE IF NOT EXISTS questions(id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, question TEXT NOT NULL)");
}

function widgetForm(req, res){
    return 'widget.html';
}

function managePreflightRequest(req, res) {
    console.log(req.method);
    res.writeHead(200, {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers':'Content-Type',
        'Access-Control-Allow-Methods':'*',
        'Content-Type':'application/json'
    });
    res.end();
}

function widgetStyles(req, res){
    return 'wstyles.css';
}

function widgetScript(req, res){
    return 'script.js';
}

function submitData(req, res){
    let data = [];
    req.on('data', chunk=>{
        data.push(chunk);
    });

    req.on('end', ()=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.writeHead(200, {'Content-Type':'application/json'})
        const user_data = JSON.parse(data.join());
        addDataToDataBase(user_data, res);
    });
}

async function addDataToDataBase(data, res) {
    console.log(data);
    pool.query("INSERT INTO questions (name, email, question) VALUES ('"+data.user_name+"', '"+data.user_email+"', '"+data.user_question+"')");
    res.end();
}