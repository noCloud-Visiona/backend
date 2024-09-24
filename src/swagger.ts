import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Defina as opções de configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Identificação de Nuvens',
      version: '1.0.0',
      description: 'Aplicativo Identifica Nuvens',
    },
    servers: [
      {
        url: 'http://host.docker.internal:3000', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos que contêm as rotas/documentação
};

// Iniciar a documentação do Swagger com as opções definidas
const swaggerSpec = swaggerJSDoc(options);

// Função para carregar a documentação do Swagger na aplicação Express
export const setupSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
