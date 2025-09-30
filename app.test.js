const request = require("supertest");
const app = require("./src/app");

describe("API de Filmes", () => {
  it("GET /app/filmes → deve retornar status 200", async () => {
    const response = await request(app).get("/app/filmes");
    expect(response.statusCode).toBe(200);
  });
});
