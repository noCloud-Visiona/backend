import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Administrador } from './Administrador';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @ManyToOne(() => Administrador, (administrador) => administrador.usuarios)
  administrador: Administrador;
}
