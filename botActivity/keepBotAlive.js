const http= require("http");

http.createServer(function(req,res){
    res.write("Im still alive")
    res.end();
}).listen(8080);