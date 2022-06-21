const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', function (req, res) {
  res.send({
    message: 'hola',
  });
});

app.get('/sum', function (req, res) {

});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a / req.body.b,
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
