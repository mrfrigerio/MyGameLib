# 🎮 My Game Library

Aplicação full-stack para gerenciar sua biblioteca de jogos. Utiliza **Node.js**, **PostgreSQL** e **React com Vite**, com deploy via **Docker Compose** ou execução local.

## 🗂️ Estrutura do Projeto

## 🚀 Tecnologias

- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:** React, Vite, Serve
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker, Docker Compose

---

## ⚙️ Como rodar o projeto com Docker

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo

## 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/my-game-library.git
cd my-game-library
```

## 2. Inicie os containers com Docker Compose:

```bash
docker-compose up --build
```

Acesse os serviços:

Frontend: http://localhost:4173

Backend (API / Swagger): http://localhost:3033/api/docs

Postgres: Acessível via localhost:5432

## Comandos úteis com Docker

Executar a aplicação via Docker:

```bash
 docker compose up -d --build
```

Parar e remover containers:

```bash
docker-compose down
```

# 🧪 Desenvolvimento Local (sem Docker)

## Pré-requisitos

## Node.js (versão 20+)

- PostgreSQL
- Yarn ou npm
- Prisma CLI

## 1. Suba o banco PostgreSQL localmente

Crie um banco chamado mygamelibrarydb. Exemplo via terminal:

CREATE DATABASE mygamelibrarydb;

## 2. Configure variáveis de ambiente

No diretório backend/, crie um arquivo .env com as credenciais adequadas (usuário e senha do banco)

## 3. Rodando o backend

```bash
cd backend
npm install
npx prisma db push
npm run dev
```

API estará disponível em: http://localhost:3033

## 4. Rodando o frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend estará disponível em: http://localhost:5173
