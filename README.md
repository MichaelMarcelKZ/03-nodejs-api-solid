#  Gym API Solid

Este projeto foi desenvolvido durante meus estudos na ``Trilha NodeJS`` da **Rocketseat**

## Sobre o projeto

O Gym API Solid é um projeto back-end desenvolvido utilizando **Design Patterns**, testes automatizados **End-To-End (E2E)** e **Unitários**, além dos princípios **SOLID** e Integração Continua **(CI)**

O projeto consiste em uma aplicação onde é possível fazer check-ins em academias próximas que estão cadastradas, utilizando o conceito de aplicações como o GymPass e Totalpass, por exemplo.

## Princípios, Design Patterns e Metodologias

- Dependency Inversion Principle
- Repository Pattern
- Factory Pattern
- In memory Test Database
- TDD (Test-driven development) 
- Access Token & Refresh Token
- RBAC (Role-Based Access Control)
- MVCS Architecture

## Tecnologias

- Fastify Web Framework
- JWT (Json Web Token)
- Prisma ORM
- PostgreSQL
- Docker
- Vitest & Supertest
- TypeScript

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RN (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)