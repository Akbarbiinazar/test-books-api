# Book Management API

A simple CRUD API for managing books, built with **NestJS**, **Prisma**, and **PostgreSQL**.

If you want to check swagger docs, simply add **/api/docs** to the endpoint

## Tech Stack

- **NestJS** - Backend framework
- **Prisma** - ORM
- **PostgreSQL** - Database

## Getting Started

### Prerequisites

Make sure you have:

- Node.js v16+
- PostgreSQL
- pnpm (recommended for package management)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/book-management-api.git
   cd book-management-api
   ```
2. Install dependencies:

  ```bash
   pnpm install
  ```
3. Set Up Environment Variables:
  ```bash 
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/bookdb?schema=public"
  ```
4. Run Prisma Migrations:
   ```bash
     pnpm prisma migrate dev
   ```
6. Run the Application:
   ```bash
     pnpm run start:dev
   ```
