import { DataSource } from 'typeorm';
import { Usuario } from '../entity/Usuario';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';


async function createDatabase() {
  const client = new Client({
    host: 'host.docker.internal',
    port: 3432,
    user: 'postgres',
    password: 'postgres',
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
  host: 'host.docker.internal',
  port: 3432,
  username: 'postgres',
  password: 'postgres',
  database: 'cadastro_autenticacao_db',
  entities: [Usuario],
  synchronize: true,
});

async function createAdminUser() {
  const usuarioRepository = AppDataSource.getRepository(Usuario);

  const existingAdmin = await usuarioRepository.findOneBy({ is_adm: true });

  if (!existingAdmin) {
    const novoUsuario = new Usuario();
    novoUsuario.nome = 'adm';
    novoUsuario.email = 'adm@nocloud.com';

    // Criptografa a senha do administrador
    const saltRounds = 10;
    novoUsuario.senha = await bcrypt.hash('adm', saltRounds);

    novoUsuario.is_adm = true;

    novoUsuario.is_premium = true;

    await usuarioRepository.save(novoUsuario);
    console.log('Usuário administrador criado com sucesso!');
  } else {
    console.log('Usuário administrador já existe!');
  }
}

async function initializeDatabase() {
  await createDatabase();
  await AppDataSource.initialize()
    .then(async () => {
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
      await createAdminUser(); // Cria o usuário administrador
    })
    .catch((error) => console.log('Erro ao conectar com o banco de dados: ', error));
}

initializeDatabase();
