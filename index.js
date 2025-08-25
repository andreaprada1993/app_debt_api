const express = require('express');

const app = express();

app.get('/ping', (req, res) => {
  res.send('¡La terminal funciona! 🚀');
});


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});