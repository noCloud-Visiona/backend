import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn()
  id_adm: number;

  // Um administrador pode ser apenas um usuário (One-to-One obrigatório)
  @OneToOne(() => Usuario, usuario => usuario.administrador, { nullable: false })
  usuario: Usuario;
}
