class Router{
    static inst = null;

    constructor(){
        this.rout = new Map();
    }

    static create(){
        if(!Router.inst) Router.inst = new Router();
        return Router.inst;
    }

    serveRout(req,res){
        function err(){};
        if (this.rout.has(`${req.method} ${req.url}`)){
            return this.rout.get(`${req.method} ${req.url}`)(req,res);
        }
        else return err;
    }

    appendRout(method, url, func){
        function err(){};
        return (typeof(method) != 'string' && typeof(url) != 'string') ? error : this.rout.set(`${method} ${url}`, func);
    }
}

module.exports = Router;