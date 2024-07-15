const express = require ('express');
// const { Pool } = require ('pg');
const pool = require('./config/connection');

const PORT = process.env.PORT || 3001;
const routes = require ('./routes');
const app = express();

app.use(express.json());
app.use(routes);



app.listen(PORT, () => {
    console.log (`server live on ${PORT}`);
});




