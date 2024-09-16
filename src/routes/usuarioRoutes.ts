import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário publico
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro na criação do usuário.
 */
router.post('/usuarios', (req, res) => usuarioController.criarUsuario(req, res));

export default router;
