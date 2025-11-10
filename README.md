# API REST de Filmes

Uma API simples criada com Node.js e Express para gerenciar uma coleção de filmes.

## Descrição

Este projeto fornece endpoints para listar e, futuramente, adicionar, atualizar e deletar filmes de uma coleção armazenada em um arquivo JSON.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)

## Instalação

1. Clone este repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
    ```
    cd api-filmes
    ```
3.Instale as dependências:
    ```
    npm install
    ```

## Endpoint Disponíveis

Obter todos os filmes
- Método: `GET`
- URL: `/app/filmes`
- URL de Exemplo: `http://localhost:3000/app/filmes`
- Resposta de Sucesso:
    - Código: `200 OK`
    - Conteúdo:
        ```
        [
           {
             "id": 1,
             "titulo": "Sherlock Holmes e a Garra Escarlate",
             "ano": 1944,
             "diretor": "Roy William Neill"
           },
           {
             "id": 2,
             "titulo": "O Resgate do Soldado Ryan",
             "ano": 1998,
             "diretor": "Steven Spielberg"
           },
           {
             "id": 3,
             "titulo": "Colheita Amarga",
             "ano": 2017,
             "diretor": "George Mendeluk"
           }
        ]
      ```

## Adicionar um novo filme
- Método: `POST`
- URL: `/app/filmes`
- URL de Exemplo: `http://localhost:3000/app/filmes`
- Corpo da Requisição (Body): A requisição deve conter um objeto JSON com os detalhes do filme.
  ```
  {
     "titulo": "Parasita",
     "ano": 2019,
     "diretor": "Bong Joon Ho"
  }
  ```
- Resposta de Sucesso:
- Código: `201 Created`
- Conteúdo: O objeto do filme recém-criado, incluindo seu novo `id`.
    ```
    {
     "id": 4,
     "titulo": "Parasita",
     "ano": 2019,
     "diretor": "Bong Joon Ho"
    }
    ```

- Resposta de Erro (Campos Faltando):
- Código: `400 Bad Request`
- Conteúdo:
    ```
    {
     "message": "Todos os campos (titulo, ano, diretor) são obrigatórios."
    }
    ```

### Remover um filme existente
- Método: `DELETE`
- URL: `/app/filmes/:id`
- Exemplo: `http://localhost:3000/app/filmes/2`

- Resposta de sucesso:
- Código: `204 No Content`
- Conteúdo: 
    ```
    Sem corpo de resposta, o filme foi removido com sucesso
    ```

- Resposta de erro: 
- Código: `404 Not Found`
- Conteúdo: 
    ```
    {
      "message": "Filme não encontrado."
    }
    ```

- Resposta de erro interno: 
- Código: `500 Internal Server Error`
- Conteúdo: 
    ```
    {
      "message": "Erro ao salvar ou ler o arquivo de filmes."
    }
    ```

## Como Executar a API

Para iniciar o servidor, execute o seguinte comando no terminal:
    ```
    npm run dev
    ```

Acesse a url:
    ```
    http://localhost:3000/app/filmes
    ```

## Testes e Cobertura

Para executar os testes automatizados:
```
  npm test
```

Gerar relatório de cobertura: 
```
  npm run test:coverage
```

## Workflow utilizado

Foi usado para a adição de novas funcionalidades como a rota POST, o workflow de desenvolvimento `GitHub Flow`, que é uma implementação simplificada e ágil do `Feature Branch Workflow`.
### E porque decidi usar o GitHub Flow?

Por que ele é centrado na ideia de que a branch `master` deve estar sempre estável e pronta para ser implantada em produção. Todo novo trabalho é feito em branches separadas, chamadas de "feature branches".
Assim temos um isolamento e segurança do código implementado, visto que ao criar a rota `POST` na branch dedicada `feat/add-movie`, garantimos que a brach `master` permaneca intacta e funcional, isolando qualquer erro que venha a ter durante o desenvolvimento fica nessa nova branch, sem afetar a versão principal da API.

Além disso facilita a revisão do código, permitindo que outros desenvolvedores analisem o código. E o histórico permanece limpo e rastreável, onde temos agilidade e podemos botar em prática a Integração Contínua e Entrega Contínua CI/CD.

O GitHub Flow foi escolhido por ser seguro, colaborativo e organizado. Ideal para aplicações web e APIs.
