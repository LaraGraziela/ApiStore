# Documentação do Software

Este documento fornece informações sobre o projeto de software "Store Project", incluindo links para os repositórios do back-end e front-end, instruções para executar o projeto localmente e detalhes sobre os endpoints da API.

## Links dos repositórios

- Back-end: [https://github.com/LaraGraziela/store_project_back](https://github.com/LaraGraziela/store_project_back)
- Front-end: [https://github.com/LaraGraziela/store_project_front](https://github.com/LaraGraziela/store_project_front)
- Documentação da API via Postman: [https://documenter.getpostman.com/view/15123976/2s93m7W21n](https://documenter.getpostman.com/view/15123976/2s93m7W21n)

## Instruções de instalação e execução

Siga as instruções abaixo para clonar os repositórios e executar o projeto localmente.

### Back-end

1. Clone o repositório do back-end em seu ambiente local:

`git clone https://github.com/LaraGraziela/store_project_back`

2. Acesse o diretório `store_project_back`:

`cd store_project_back`

3. Execute o comando abaixo para instalar as dependências do projeto:

`npm install`

4. Execute as migrações do banco de dados utilizando o Sequelize:

`npx sequelize db:migrate`

5. Execute o comando abaixo para popular o banco de dados com dados de exemplo:

`npx sequelize db:seed:all`

6. Inicie o projeto executando o seguinte comando:

`npm start`

O back-end estará sendo executado na porta 4000.

### Front-end

1. Clone o repositório do front-end em seu ambiente local:

`git clone https://github.com/LaraGraziela/store_project_front`

2. Acesse o diretório `store_project_front`:

`cd store_project_front`

3. Execute o comando abaixo para instalar as dependências do projeto:

`npm install`

4. Inicie o projeto executando o seguinte comando:

`npm start`

O front-end estará sendo executado na porta 3000.

## Acesso à API

As rotas do projeto podem ser acessadas em `http://localhost:4000`. Consulte a documentação da API [aqui](https://documenter.getpostman.com/view/15123976/2s93m7W21n) para obter informações detalhadas sobre os endpoints disponíveis.

## Acesso via navegador

O projeto pode ser acessado pelo navegador em `http://localhost:3000`.

## Endpoints

A seguir estão listados os principais endpoints disponíveis na API:

### Usuários

- Listar usuários: `GET /users`
- Buscar usuário por ID: `GET /user/:id`
- Atualizar usuário por ID: `PUT /user/:id`
- Deletar usuário por ID: `DELETE /user/:id`
- Autenticação de usuário: `POST /login`
- Registrar novo usuário: `POST /register`

### Produtos

- Listar produtos: `GET /products`
- Buscar produto por ID: `GET /product/:id`
- Criar novo produto: `POST /products`
- Atualizar produto por ID: `PUT /product/:id`
- Deletar produto por ID: `DELETE /product/:id`

## Instruções de login

- Usuário ADMIN:
- Email: admin@gmail.com
- Senha: 12345

- Usuário CLIENT:
- Email: client@gmail.com
- Senha: 12345

## Banco de dados

O projeto utiliza um banco de dados SQLite, localizado em `/store_project_back/database/db.sqlite`.

---

Este documento fornece as informações necessárias para configurar e executar o projeto "Store Project" localmente. Certifique-se de seguir as instruções corretamente para garantir o funcionamento adequado do software. Em caso de dúvidas, consulte a documentação da API.
