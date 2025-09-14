const express = require("express");
const movies = require("./movies.json");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

const PORT = 3000;

const moviesPath = path.join(__dirname, 'movies.json');

app.get('/app/filmes', (req, res) => {
    res.status(200).json(movies);
});

app.post('/app/filmes', (req, res) =>{
    const {titulo, ano, diretor} = req.body;

    if(!titulo || !ano || !diretor){
        return res.status(400).json({message: 'Todos os campos são obrigatórios.'});
    }

    const novoId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;

    const novoFilme = {
        id: novoId,
            titulo,
            ano,
            diretor
    };

    const filmesAtualizados = [...movies, novoFilme];

    fs.writeFile(moviesPath, JSON.stringify(filmesAtualizados, null, 2), (err) => {
        if (err) {
        console.error('Erro ao salvar o filme:', err);
        
        return res.status(500).json({ message: 'Erro interno do servidor ao salvar o filme.' });
        }
        
        res.status(201).json(novoFilme);
  });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})