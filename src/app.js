const express = require("express");
const movies = require("./movies.json");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/app/filmes', (req, res) => {
    res.status(200).json(movies);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})