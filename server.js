const express = require('express');
const bodyParser = require('body-parser');
const { AppConfig } = require('aws-sdk');
const app = express();
const PORT = 4000;
const usersRoute = require('./routes/usersroute');

app.use(bodyParser.json());
app.use('/users', usersRoute);

app.listen(PORT,() => console.log('Servidor rodando na porta '+ PORT));