import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Historico } from './Historico';
import { Publico } from './Publico';
import { Administrador } from './Administrador';

@Entity()
export class Possui {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Historico)
  historico: Historico;

  @ManyToOne(() => Publico)
  publico: Publico;

  @ManyToOne(() => Administrador)
  administrador: Administrador;
}
