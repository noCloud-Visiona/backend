import { DataSource } from 'typeorm';
import { Usuario } from '../entity/Usuario';
import { Client } from 'pg';
import { Publico } from '../entity/Publico';
import { Administrador } from '../entity/Administrador';


async function createDatabase() {
  const client = new Client({
    host: 'localhost',
    port:  5432,
    user: 'postgres',
    password: 'topsp808',
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = 'cadastro_autenticacao_db'`);
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE cadastro_autenticacao_db');
      console.log('Banco de dados criado com sucesso!');
    } else {
        console.log('Banco de dados já existe!');
    }
} catch (error) {
    console.log('Erro ao criar o banco de dados: ', error);
  } finally {
    await client.end();
  }
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'topsp808',
  database: 'cadastro_autenticacao_db',
  entities: [Usuario, Publico, Administrador],
  synchronize: true,
});

async function initializeDatabase() {
  await createDatabase();
  await AppDataSource.initialize().then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((error) => console.log('Erro ao conectar com o banco de dados: ', error));
}

initializeDatabase();