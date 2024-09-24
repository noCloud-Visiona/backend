import express from 'express';
import cors from 'cors';
import usuarioRoutes from './src/routes/usuarioRoutes';
import { AppDataSource } from './src/config/database';
import { setupSwagger } from './src/swagger';

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use(cors());

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso');
  })
  .catch((error) => console.log('Erro ao conectar no banco de dados:', error));

// Adiciona as rotas de usuário
app.use('/noCloud', usuarioRoutes);

// Configuração do Swagger
setupSwagger(app);

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Documentação disponível em http://localhost:3001/docs');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
