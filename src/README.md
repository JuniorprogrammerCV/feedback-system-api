# Feedback System API

## Descrição
A **Feedback System API** é uma API RESTful desenvolvida para gerenciar feedbacks e serviços. Ela permite que os usuários registrem-se, façam login, criem serviços e feedbacks, e visualizem listas de serviços e feedbacks.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para Node.js.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Passport**: Middleware de autenticação para Node.js.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.

## Instalação

1. Clone o repositório:
   
   git clone https://github.com/seu-usuario/feedback-system.git
   cd feedback-system
   

2. Instale as dependências:
   
   npm install
  

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
   
   DB_NAME=feedback_db
   DB_USER=postgres
   DB_PASS=password
   DB_HOST=localhost
   ```

4. Inicie o servidor:

   npm run start
  

## Endpoints

### Autenticação

#### Registro de Usuário
- **URL**: `/api/register`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Respostas**:
  - `201 Created`: Usuário registrado com sucesso.
  - `400 Bad Request`: Usuário já existe.
  - `500 Internal Server Error`: Erro no servidor.

#### Login de Usuário
- **URL**: `/api/login`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Respostas**:
  - `200 OK`: Login bem-sucedido.
  - `400 Bad Request`: Credenciais inválidas.
  - `500 Internal Server Error`: Erro no servidor.

### Serviços

#### Criar Serviço
- **URL**: `/api/create`
- **Método**: `POST`
- **Cabeçalhos**:
  - `Authorization`: Token JWT
- **Corpo da Requisição**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Respostas**:
  - `201 Created`: Serviço criado com sucesso.
  - `403 Forbidden`: Acesso negado.
  - `500 Internal Server Error`: Erro no servidor.

#### Listar Serviços
- **URL**: `/api/`
- **Método**: `GET`
- **Respostas**:
  - `200 OK`: Lista de serviços.
  - `500 Internal Server Error`: Erro no servidor.

### Feedbacks

#### Criar Feedback
- **URL**: `/api/services/:id/feedbacks`
- **Método**: `POST`
- **Cabeçalhos**:
  - `Authorization`: Token JWT
- **Corpo da Requisição**:
  ```json
  {
    "content": "string"
  }
  ```
- **Respostas**:
  - `201 Created`: Feedback criado com sucesso.
  - `400 Bad Request`: Feedback deve ter pelo menos 10 caracteres.
  - `500 Internal Server Error`: Erro no servidor.

#### Listar Feedbacks
- **URL**: `/api/services/:id/feedbacks`
- **Método**: `GET`
- **Respostas**:
  - `200 OK`: Lista de feedbacks.
  - `500 Internal Server Error`: Erro no servidor.

## Modelos

### Usuário
- **username**: `string` (único, obrigatório)
- **password**: `string` (obrigatório)
- **role**: `enum('admin', 'client')` (padrão: 'client')

### Serviço
- **name**: `string` (obrigatório)
- **description**: `string` (obrigatório)

### Feedback
- **content**: `string` (obrigatório)
- **serviceId**: `integer` (referência à tabela de serviços, obrigatório)
- **createdAt**: `timestamp` (padrão: CURRENT_TIMESTAMP)

## Middlewares

### Autenticação
- **checkAuth**: Verifica se o usuário está autenticado.
- **checkAdmin**: Verifica se o usuário tem permissão de administrador.

### Validação
- **validateFeedback**: Verifica se o feedback tem pelo menos 10 caracteres.

## Configuração do Banco de Dados
- **Arquivo**: `src/config/db.js`
- **Configuração**:
  ```javascript
  const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  });

  module.exports = sequelize;
  ```

## Configuração do Passport
- **Arquivo**: `src/passportConfig.js`
- **Configuração**:
  ```javascript
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const User = require('./models/User');
  const bcrypt = require('bcryptjs');

  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
          return done(null, false, { message: 'Usuário não encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Senha incorreta' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });


## Exemplos de Requisições e Respostas

### Registro de Usuário (POST /api/register)
- **Requisição**:
  ```json
  {
    "username": "novoUsuario",
    "password": "senha123"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Usuário registrado com sucesso"
  }
  ```

### Login de Usuário (POST /api/login)
- **Requisição**:
  ```json
  {
    "username": "novoUsuario",
    "password": "senha123"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Login bem-sucedido",
    "token": "seu_token_jwt_aqui"
  }


## Erros Comuns

- **401 Unauthorized**: Token JWT não fornecido ou inválido.
- **403 Forbidden**: Acesso negado para usuários sem permissão de administrador.
- **500 Internal Server Error**: Erro no servidor.

## Configuração do Ambiente

- **Arquivo**: `.env`
- **Configuração**:
 
  DB_NAME=feedback_db
  DB_USER=postgres
  DB_PASS=password
  DB_HOST=localhost


## Dependências Necessárias

- **Dependências**:
  npm install express body-parser express-session passport passport-local bcryptjs sequelize pg dotenv
  