var fs = require("fs");
var request = require("request");

module.exports = {
    date: (args, done) => {
        done(Date());
    },
    pwd: (args, done) => {
        done('Directorio actual: '+ process.cwd());
    }, 
    ls: (args, done) => {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            done("\n");
            files.forEach(function(file) {
              done(file.toString());
            })
            //process.stdout.write("prompt > ");
          });
    },
    echo: (args, done) => {
        done(args.join(' '));
    },
    cat: (args, done) => {
        fs.readFile(args[0], 'utf8', (err, data) => {
            if (err) {
                done(err);
                return;
            }
            done("\n");
            done(data);
        });
    },
    head: (args, done) => {
        fs.readFile(args[0], 'utf8', (err, data) => {
            if (err) {
                done(err);
                return;
            }
            const lineas = data.split("\n")
            done("\n");

            for(let i = 0; i < 10; i++){
                done(lineas[i]);
            }
        });
    },
    tail: (args, done) => {
        fs.readFile(args[0], 'utf8', (err, data) => {
            if (err) {
                done(err);
                return;
            }
            const lineas = data.split("\n")
            done("\n");

            for(let i = (lineas.length-10); i < lineas.length; i++){
                done(lineas[i]);
            }
        });
    },
    curl: (args, done) => {
        request(args[0], function (error, response, body) {
            if(error) throw error
            done(body);
        })
    }
}