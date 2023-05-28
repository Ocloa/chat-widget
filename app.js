const http = require('http');
const path = require('path');
const fs = require('fs');
const Router = require('./router');
const { Console } = require('console');
const PORT = 5501;
const HOST = 'localhost';

let rout = new Router();

let server = http.createServer((req,res) => {
    rout.appendRout('GET', '/widget', widgetForm);
    rout.appendRout('GET', '/wstules.css', widgetStyles);
    rout.appendRout('GET', '/script.js', widgetScript);
    rout.appendRout('POST', '/submit', submitData);

    const url = req.url;

    res.setHeader('content-type', 'text/html');

    if (url.endsWith('.css')){
        res.setHeader('content-type', 'text/css');
    }
    else if (url.endsWith('.js')){
        res.setHeader('content-type', 'text/javascript');
    }

    let name = rout.serveRouter(req, res);
    if (typeof name == 'string'){
        const page = fs.createReadStream(path.join(process.cwd(), name));
        page.pipe(res);
    }

});

server.listen(PORT, HOST, () => { console.log(`Сервер запущен: http://${HOST}:${PORT}`) });

function widgetForm(req,res){
    return './widget.html';
}

function widgetStyles(req,res){
    return './wstyles.css';
}

function widgetScript(req,res){
    return './script.js';
}