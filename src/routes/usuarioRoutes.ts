import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { verificarAdmin } from "../middleware/verificaAdmin";
import { UsuarioService } from "../services/UsuarioService";

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

router.post("/login", (req, res) => usuarioController.loginUsuario(req, res));

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

router.put("/usuarios/atualizarPeloADM", async (req, res) => {
  const { novoNome, novaSenha , id_usuario } = req.body;
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

router.delete("/usuarios/delete", async (req, res) => {
  const { id_usuario } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  try {
    const usuarioService = new UsuarioService();
    await usuarioService.deletarUsuario(token, id_usuario);
    res.status(200).json({ message: "Usuário deletado publico com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/admin-dashboard", verificarAdmin, (req, res) => {
  res.status(200).json({ mensagem: "Bem-vindo ao painel do administrador!" });
});

export default router;
