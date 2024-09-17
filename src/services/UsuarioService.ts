import { AppDataSource } from "../config/database";
import { Usuario } from "../entity/Usuario";
import { Repository } from "typeorm";
import * as bdcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;

  constructor() {
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
  }

  // Função para criar um usuário
  async criarUsuario(
    nome: string,
    email: string,
    senha: string,
    token: string
  ): Promise<Usuario> {
    // Valida o token JWT
    const secret = process.env.JWT_SECRET || "defaultSecret";
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }

    // Verifica se o usuário que está tentando criar um novo usuário é um administrador
    if (!decodedToken.is_adm) {
      throw new Error("Somente administradores podem criar novos usuários");
    }

    // Criptografa a senha antes de salvar
    const saltRounds = 10;
    const senhaHash = await bdcrypt.hash(senha, saltRounds);

    // Verifica se o e-mail já está cadastrado
    const usuarioEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (usuarioEmail) {
      throw new Error("E-mail já cadastrado");
    }

    // Cria um novo usuário
    const novoUsuario = new Usuario();
    novoUsuario.nome = nome;
    novoUsuario.email = email;
    novoUsuario.senha = senhaHash;
    novoUsuario.is_adm = false; // Por padrão, novos usuários não são administradores

    // Salva o novo usuário no banco de dados
    return await this.usuarioRepository.save(novoUsuario);
  }

  async loginUsuario(email: string, senha: string): Promise<string> {
    // Busca o usuário no banco de dados
    const usuario = await this.usuarioRepository.findOne({
      where: { email: email },
    });

    // Verifica se o usuário existe
    if (!usuario) {
      throw new Error("E-mail ou senha inválidos!!!");
    }

    // Verifica se a senha está correta
    const senhaValida = await bdcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("E-mail ou senha inválidos");
    }

    const secret = process.env.JWT_SECRET || "defaultSecret";

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, is_adm: usuario.is_adm }, // Payload
      secret, // Chave secreta
      { expiresIn: "1h" } // Expiração do token
    );

    return token;
  }

  async atualizarUsuario(
    token: string,
    novoNome?: string,
    novaSenha?: string
  ): Promise<Usuario> {
    // Verifica o token JWT
    const secret = process.env.JWT_SECRET || "defaultSecret";
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }

    // Busca o usuário no banco de dados pelo ID contido no token
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: decodedToken.id },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Atualiza o nome, se fornecido
    if (novoNome) {
      usuario.nome = novoNome;
    }

    // Atualiza a senha, se fornecida (e criptografa antes de salvar)
    if (novaSenha) {
      const saltRounds = 10;
      usuario.senha = await bdcrypt.hash(novaSenha, saltRounds);
    }

    // Salva as alterações no banco de dados
    return await this.usuarioRepository.save(usuario);
  }

  async atualizarUsuarioAdm(
    token: string,
    novoNome?: string,
    novaSenha?: string,
    id_usuario?: number
  ): Promise<Usuario> {
    // Verifica o token JWT
    const secret = process.env.JWT_SECRET || "defaultSecret";
    let decodedToken;

    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }

    // Busca o usuário no banco de dados pelo ID contido no token
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Atualiza o nome, se fornecido
    if (novoNome) {
      usuario.nome = novoNome;
    }

    // Atualiza a senha, se fornecida (e criptografa antes de salvar)
    if (novaSenha) {
      const saltRounds = 10;
      usuario.senha = await bdcrypt.hash(novaSenha, saltRounds);
    }

    // Salva as alterações no banco de dados
    return await this.usuarioRepository.save(usuario);
  }

  async deletarUsuario(token: string, id_usuario: number): Promise<void> {
    // Verifica o token JWT
    const secret = process.env.JWT_SECRET || "defaultSecret";
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secret);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }

    // Verifica se o usuário que está tentando deletar o usuário é um administrador
    if (!decodedToken.is_adm) {
      throw new Error("Somente administradores podem deletar usuários");
    }

    // Busca o usuário no banco de dados pelo ID contido no token
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Deleta o usuário do banco de dados
    await this.usuarioRepository.delete(usuario.id_usuario);
  }
}
