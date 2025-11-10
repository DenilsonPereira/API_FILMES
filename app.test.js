const fs = require("fs");
const path = require("path");
const request = require("supertest");
const app = require("./src/app");

const moviesPath = path.join(__dirname, "src/movies.json");

describe("API de Filmes", () => {
  it("GET /app/filmes → deve retornar status 200", async () => {
    const response = await request(app).get("/app/filmes");
    expect(response.statusCode).toBe(200);
  });

  it("POST /app/filmes → deve adicionar um novo filme e retornar 201", async () => {
    const novoFilme = { titulo: "Herege", ano: 2024, diretor: "Scott Beck" };

    const response = await request(app)
      .post("/app/filmes")
      .send(novoFilme);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.titulo).toBe("Herege");
  });

  it("POST /app/filmes → deve retornar 400 se faltar campos obrigatórios", async () => {
    const response = await request(app)
      .post("/app/filmes")
      .send({ titulo: "Sem Ano e Diretor" });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("DELETE /app/filmes/:id → deve remover um filme existente e retornar 204", async () => {
    const novoFilme = { id: 991, titulo: "Recife Frio", ano: 2009, diretor: "Kleber Mendonça Filho" };
    const filmes = JSON.parse(fs.readFileSync(moviesPath, "utf8"));
    filmes.push(novoFilme);
    fs.writeFileSync(moviesPath, JSON.stringify(filmes, null, 2));

    const response = await request(app).delete("/app/filmes/991");
    expect(response.statusCode).toBe(204);

    const filmesAtualizados = JSON.parse(fs.readFileSync(moviesPath, "utf8"));
    const existe = filmesAtualizados.some(f => f.id === 991);
    expect(existe).toBe(false);
  });

  it("DELETE /app/filmes/:id → deve retornar 404 se o filme não existir", async () => {
    const response = await request(app).delete("/app/filmes/123459");
    expect(response.statusCode).toBe(404);
  });

  it("POST /app/filmes → deve retornar 500 se ocorrer erro ao salvar o arquivo", async () => {
    const originalWriteFile = fs.writeFile;
    fs.writeFile = jest.fn((_, __, cb) => cb(new Error("Falha ao escrever arquivo")));

    const response = await request(app)
      .post("/app/filmes")
      .send({ titulo: "Teste erro", ano: 2024, diretor: "Erro Simulado" });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message");

    fs.writeFile = originalWriteFile;
  });

  it("DELETE /app/filmes/:id → deve retornar 500 se ocorrer erro ao salvar após exclusão", async () => {
    const originalWriteFile = fs.writeFile;
    fs.writeFile = jest.fn((_, __, cb) => cb(new Error("Falha ao excluir")));

    const response = await request(app).delete("/app/filmes/1");
    expect(response.statusCode).toBe(500);

    fs.writeFile = originalWriteFile;
  });

  it('DELETE /app/filmes/:id → deve retornar 500 se ocorrer erro ao ler o arquivo', async () => {
  jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
    callback(new Error('Falha ao ler arquivo'), null);
  });

  const res = await request(app).delete('/app/filmes/1');
  expect(res.status).toBe(500);
  expect(res.body).toHaveProperty('message', 'Erro interno ao ler o arquivo.');

  fs.readFile.mockRestore();
});
});