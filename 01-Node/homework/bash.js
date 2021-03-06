//console.log(Object.keys(process));

/* // Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');
}) */

const commands = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var [cmd, ...args] = data.toString().trim().split(' '); // remueve la nueva línea

/*   if (cmd === 'date') {
    commands[cmd]();
  }
  if (cmd === 'pwd') {
    commands[cmd]();
  }
  if (cmd === 'ls') {
    commands[cmd]();
  } */
  function write(output) {
    process.stdout.write(output)
    process.stdout.write('\n');
  }

  commands.hasOwnProperty(cmd) && commands[cmd](args, write);

  process.stdout.write('\nprompt > ');
});