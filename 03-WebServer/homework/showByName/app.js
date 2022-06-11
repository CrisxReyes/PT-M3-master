var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer( function(req, res){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
 //Para crear un response empezamos escribiendo el header
    /* if (req.url === '/images/arcoiris_doge.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }) 
        var img = fs.readFileSync(__dirname + '/images/arcoiris_doge.jpg')
        res.end(img);
    } */
    var files = fs.readdirSync(__dirname + '/images')

    if (req.url === '/images/arcoiris_doge.jpg') {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' }) 
        res.end(img);

}).listen(1337, '127.0.0.1'); 