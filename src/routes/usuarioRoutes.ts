import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

// Rota para criar um novo usuário
router.post('/usuarios', (req, res) => usuarioController.criarUsuario(req, res));

export default router;
