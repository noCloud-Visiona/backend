import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from './Usuario';
import { Publico } from './Publico';
import { Administrador } from './Administrador';

@Entity()
export class PossuiNivelAcesso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @ManyToOne(() => Publico)
  publico: Publico;

  @ManyToOne(() => Administrador)
  administrador: Administrador;
}
