import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Publico {
  @PrimaryGeneratedColumn()
  id_publico: number;

  // Um público pode ter vários usuários (One-to-Many)
  @OneToMany(() => Usuario, usuario => usuario.publico)
  usuarios: Usuario[];
}
