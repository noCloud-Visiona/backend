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
      const usuario = await this.usuarioService.criarUsuario(nome, email, senha, is_adm);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ mensagem: 'Erro ao criar o usuário', error: error.message });
    }
  }
}
