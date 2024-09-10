import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn()
  id_adm: number;

  @OneToMany(() => Usuario, (usuario) => usuario.administrador)
  usuarios: Usuario[];
}
