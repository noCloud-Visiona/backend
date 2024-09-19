import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  // Função para criar um usuário
  async criarUsuario(req: Request, res: Response) {
    const { nome, email, senha, is_adm } = req.body;

    try {
      const usuario = await this.usuarioService.criarUsuario(nome, email, senha);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ mensagem: 'Erro ao criar o usuário', error: error.message });
    }
  }

  async loginUsuario(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const token = await this.usuarioService.loginUsuario(email, senha);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ mensagem: 'Erro ao fazer login', error: error.message });
    }
  }

  // Função para listar todos os usuários (somente administradores)
  async listarTodosUsuarios(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    
    try {
      const usuarios = await this.usuarioService.listarTodosUsuarios(token);
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Função para buscar um usuário por ID
  async buscarUsuarioPorId(req: Request, res: Response) {
    const { id_usuario } = req.params;
    const token = req.headers.authorization?.split(" ")[1];
    
    try {
      const usuario = await this.usuarioService.buscarUsuarioPorId(Number(id_usuario), token);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async tornarUsuarioPremium(req: Request, res: Response) {
    const { id_usuario } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header Authorization

    try {
      const resultado = await this.usuarioService.tornarPremium(id_usuario, token);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ mensagem: 'Erro ao transformar o usuário em premium', error: error.message });
    }
  }

  
}
