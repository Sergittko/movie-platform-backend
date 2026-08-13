<h1 align="center">Movie Platform Backend 🎬</h1>

<p align="center">
  REST API backend for a full-stack movie platform built with NestJS and Node.js.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?style=flat&logo=nestjs&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-22-339933?style=flat&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat&logo=prisma&logoColor=white">
  <img src="https://img.shields.io/badge/Supabase-2-3ECF8E?style=flat&logo=supabase&logoColor=white">
</p>

---

## 📖 About the Project

Movie Platform Backend is a REST API built with NestJS for a full-stack movie
platform.

The backend provides authentication, user management, movie data, personalized
features and premium functionality for the frontend application.

The project uses JWT-based authentication, Supabase, Prisma ORM and external
movie data services.

---

## 🛠️ Technologies

### Backend

- NestJS
- Node.js
- TypeScript
- REST API
- JWT Authentication
- Passport JWT
- Supabase
- Prisma ORM
- Axios
- Class Validator
- Class Transformer

### Database & Services

- PostgreSQL / Supabase
- Prisma Migrations
- Supabase Authentication

### Development Tools

- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- Jest
- Supertest
- Postman

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected and public routes
- Authentication guards
- Token validation
- Supabase authentication integration

### 🎬 Movies

- Movie lists
- Movie search
- Movie filtering and sorting
- Movie genres
- Pagination
- Movie details
- Integration with external movie data services

### 👤 Users

- User profiles
- Watch List
- Seen Movies
- Saved movie management
- User preferences
- Premium status

### 🎯 Personalized Recommendations

The backend supports personalized movie recommendations based on user
preferences and movie interactions.

Authenticated users can evaluate movies and receive personalized
recommendations through the API.

### 📊 Premium Statistics

Premium users can access personalized statistics related to:

- Watched movies
- Movie genres
- Viewing activity
- Personal movie collections

Premium access is validated on the backend before protected data is returned.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sergittko/movie-platform-backend.git
cd movie-platform-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on the required environment variables.

```env
```

> Environment variable names may differ depending on your local configuration.

### 4. Generate Prisma Client

```bash
npm run prisma-generate
```

### 5. Run database migrations

```bash
npm run prisma-init
```

### 6. Start the development server

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3001
```

---

## 📦 Available Scripts

### Development

```bash
npm run start
```

Starts the application.

### Watch mode

```bash
npm run start:dev
```

Starts the application in watch mode.

### Debug mode

```bash
npm run start:debug
```

Starts the application in debug mode with watch mode enabled.

### Production build

```bash
npm run build
```

Builds the application for production.

### Production

```bash
npm run start:prod
```

Starts the compiled production application.

### Prisma Generate

```bash
npm run prisma-generate
```

Generates the Prisma Client.

### Prisma Migration

```bash
npm run prisma-init
```

Creates and applies a new Prisma development migration.

### Lint

```bash
npm run lint
```

Runs ESLint and automatically fixes available issues.

### Format

```bash
npm run format
```

Formats TypeScript source and test files using Prettier.

---

## 🧪 Testing

The project uses Jest and Supertest for testing.

### Unit tests

```bash
npm run test
```

### End-to-end tests

```bash
npm run test:e2e
```

### Test coverage

```bash
npm run test:cov
```

---

## 🔧 Code Quality

The project uses several tools to maintain code quality and consistency:

- ESLint
- Prettier
- Husky
- lint-staged
- Commitlint
- Conventional Commits
- Jest

Git hooks are configured to automatically run validation and formatting
before commits.

---

### 📚 Documentation

A Postman collection is included in:

`docs/postman_collection/MoviesPlatform.postman_collection.json`

---

## 🔗 Related Project

### Movie Platform Frontend

[Movie Platform Frontend](https://github.com/Sergittko/movie-platform-frontend)

---

## 🌐 Live Demo

[Movie Platform](https://movie-platform-frontend-henna.vercel.app/)

---

<p align="center">
  Done by <b>Sergio Diorov</b>
</p>
