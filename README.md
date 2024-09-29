# Backend da NoCloud-Visiona

## Tecnologias Utilizadas
- TypeScript
- Node.js
- Express
- PostgreSQL (via TypeORM)
- JWT (JSON Web Token) para autenticação
- Swagger para documentação da API
- CORS
- 
## Pré-Requisitos

Para rodar a aplicação, você precisará ter instalados:
- Node.js (v14 ou superior)
- PostgreSQL
- Yarn ou NPM

## Instale as Dependências 

```sh
npm install
```

## Configuração do Banco de Dados

- Crie um banco de dados PostgreSQL.
- Configure a conexão no arquivo src/config/database.ts com suas credenciais de banco.
- Inicialização da Conexão com o Banco de Dados No projeto, o arquivo src/config/database.ts já contém a configuração necessária para inicializar o banco de dados com TypeORM.

## Rodar Aplicação

```sh
npm start
```

## Rotas:

```POST /noCloud/usuarios``` - Criação de novo usuário público.  
```POST /noCloud/login``` - Login do usuário.  
```PUT /noCloud/usuarios/atualizar``` - Atualização de dados do usuário.  
```PUT /noCloud/usuarios/atualizarPeloADM``` - Atualização de dados de qualquer usuário (somente administradores).  
```DELETE /noCloud/usuarios/delete``` - Exclusão de um usuário (somente administradores).  
```GET /noCloud/admin-dashboard``` - Painel do administrador.  
```POST /noCloud/usuarios/tornarPremium``` - Torna um usuário premium (somente administradores).  
```GET /noCloud/usuarios/listar``` - Lista todos os usuários (somente administradores).  
```GET /noCloud/usuarios/:id_usuario``` - Busca um usuário pelo ID.  
