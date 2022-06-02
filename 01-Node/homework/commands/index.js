var fs = require("fs");

module.exports = {
    date: () => {
        process.stdout.write(Date());
    },
    pwd: () => {
        process.stdout.write('Directorio actual: '+ process.cwd());
    }, 
    ls: () => {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
          });
    }
}