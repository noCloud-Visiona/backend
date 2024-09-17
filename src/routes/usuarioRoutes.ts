import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { verificarAdmin } from "../middleware/verificaAdmin";
import { UsuarioService } from "../services/UsuarioService";

const router = Router();
const usuarioController = new UsuarioController();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 * components:
 *   securitySchemes:
 *     bearerAuth:          # O nome do esquema de segurança
 *       type: http         # Tipo de esquema de segurança
 *       scheme: bearer     # Tipo de autenticação HTTP (Bearer Token)
 *       bearerFormat: JWT  # Formato do token (JWT)
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário público
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
router.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do header Authorization

  try {
    const usuarioService = new UsuarioService();
    const novoUsuario = await usuarioService.criarUsuario(
      nome,
      email,
      senha,
      token
    );
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *       400:
 *         description: E-mail ou senha inválidos.
 */
router.post("/login", (req, res) => usuarioController.loginUsuario(req, res));

/**
 * @swagger
 * /usuarios/atualizar:
 *   put:
 *     summary: Atualiza o nome e/ou senha do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []  # Indica que essa rota requer o token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               novoNome:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Erro na atualização do usuário.
 */
router.put("/usuarios/atualizar", async (req, res) => {
  const { novoNome, novaSenha } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  try {
    const usuarioService = new UsuarioService();
    const usuarioAtualizado = await usuarioService.atualizarUsuario(
      token,
      novoNome,
      novaSenha
    );
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /usuarios/atualizarPeloADM:
 *   put:
 *     summary: Atualiza o nome e/ou senha de qualquer usuário como administrador
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               novoNome:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso pelo administrador.
 *       400:
 *         description: Erro na atualização do usuário.
 */
router.put("/usuarios/atualizarPeloADM", async (req, res) => {
  const { novoNome, novaSenha, id_usuario } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  try {
    const usuarioService = new UsuarioService();
    const usuarioAtualizado = await usuarioService.atualizarUsuarioAdm(
      token,
      novoNome,
      novaSenha,
      id_usuario
    );
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /usuarios/delete:
 *   delete:
 *     summary: Deleta um usuário (apenas para administradores)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso.
 *       400:
 *         description: Erro ao deletar o usuário.
 */
router.delete("/usuarios/delete", async (req, res) => {
  const { id_usuario } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  try {
    const usuarioService = new UsuarioService();
    await usuarioService.deletarUsuario(token, id_usuario);
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /admin-dashboard:
 *   get:
 *     summary: Painel de controle para administradores
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []  # Requer token JWT
 *     responses:
 *       200:
 *         description: Bem-vindo ao painel do administrador.
 *       403:
 *         description: Acesso negado. Apenas administradores podem acessar.
 */
router.get("/admin-dashboard", verificarAdmin, (req, res) => {
  res.status(200).json({ mensagem: "Bem-vindo ao painel do administrador!" });
});

export default router;
