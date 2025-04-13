# 🎮 My Game Library

Aplicação full-stack para gerenciar sua biblioteca de jogos. Utiliza **Node.js**, **PostgreSQL** e **React com Vite**, com deploy via **Docker Compose** ou execução local.

## 🗂️ Estrutura do Projeto

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:** React, Vite, Serve
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker, Docker Compose

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

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
