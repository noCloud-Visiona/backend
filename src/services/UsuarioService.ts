import { AppDataSource } from '../config/database';
import { Usuario } from '../entity/Usuario';

import { Repository } from 'typeorm';

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;
 

  constructor() {
    this.usuarioRepository = AppDataSource.getRepository(Usuario);

  }

  // Função para criar um usuário
  async criarUsuario(nome: string, email: string, senha: string, is_adm: boolean): Promise<Usuario> {
    // Verifica se o usuário que está tentando criar um novo usuário é um administrador
    const usuarioCriador = await this.usuarioRepository.findOne({ where: { is_adm: is_adm } });

    if ( usuarioCriador.is_adm === false ) {
      throw new Error('Somente um administrador pode criar um novo usuário');
    }

    // Cria um novo usuário
    const novoUsuario = new Usuario();
    novoUsuario.nome = nome;
    novoUsuario.email = email;
    const usuarioEmail = await this.usuarioRepository.findOne({ where: { email: email } });
    if (usuarioEmail) {
      throw new Error('E-mail já cadastrado');
    }
    novoUsuario.senha = senha;
    novoUsuario.is_adm = false;

    // Salva o novo usuário no banco de dados
    return await this.usuarioRepository.save(novoUsuario);
  }
}
