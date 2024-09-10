import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Administrador } from './Administrador';
import { Publico } from './Publico';

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

  // Um usuário pode ou não ser público (One-to-One opcional)
  @OneToOne(() => Publico, publico => publico.usuarios, { nullable: true })
  @JoinColumn({ name: 'id_publico' })
  publico?: Publico;

  // Um usuário pode ser obrigatoriamente administrador (One-to-One obrigatório)
  @OneToOne(() => Administrador, administrador => administrador.usuario, { nullable: false })
  @JoinColumn({ name: 'id_adm' })
  administrador?: Administrador;
}
