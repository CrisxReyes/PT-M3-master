var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
 //Para crear un response empezamos escribiendo el header
    var files = fs.readdirSync(__dirname + '/images');
    var filename = req.url.split('/images/')

    if (files.includes(filename[1])) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }) 
        var img = fs.readFileSync(__dirname + req.url)
        res.end(img);
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain' }) 
        res.end('404 NOT-FOUND');
    }       
}).listen(1337, '127.0.0.1'); 