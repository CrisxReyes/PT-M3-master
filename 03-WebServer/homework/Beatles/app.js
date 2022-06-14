var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer(function (req, res) {

  function API(req, res) {
    //separar el link y quedarnos con el nombre solo si es diferente de /api
    if ((req.url !== '/api') && (req.url !== '/favicon.ico')) {
      var beatle = req.url.split('/api/')[1].split('%20').join(' ');
    }
    //preguntamos por el nombre y mostramos el json de cada Beatle
    if (req.url === '/api') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(beatles));
    } else if (beatles.find(element => element.name === beatle)) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(beatles.find(element => element.name === beatle)))
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 NOT-FOUND');
    }
  }

  function template(req, res) {
    if ((req.url !== '/') && (req.url !== '/favicon.ico')) {
      var nombre = req.url.split('/')[1].split('%20').join(' ');
      var beatle = beatles.find(element => element.name === nombre);
    }
    if(req.url === '/'){
      res.writeHead(200, { 'Content-Type':'text/html' })
      var index = fs.readFileSync(__dirname +'/index.html', 'utf8');
      res.end(index)
    } else if (beatles.find(element => element.name === nombre)) {
      var template = fs.readFileSync(__dirname +'/beatle.html', 'utf8');
      template = template.replace('{nombre}', beatle.name);
      template = template.replace('{birthdate}', beatle.birthdate);
      template = template.replace('{picprofile}', beatle.profilePic);
      res.end(template);
    }else{
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 NOT-FOUND');
    }
  }

  if(req.url.includes('api')){
    API(req, res);
  }else {
    template(req, res);
  }
}).listen(1337, '127.0.0.1');