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
            process.stdout.write("\n\n");
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            //process.stdout.write("prompt > ");
          });
    },
    echo: (args) => {
        process.stdout.write(args.join(' '));
    },
    cat: (args) => {
        fs.readFile(args[0], 'utf8', (err, data) => {
            if (err) {
                process.stdout.write(err);
                return;
            }
            process.stdout.write("\n\n");
            process.stdout.write(data);
            console.log(typeof(data));
        });
    }

}