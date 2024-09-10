import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Publico } from './Publico';
import { Administrador } from './Administrador';

@Entity()
export class PossuiNivelDeAcesso {
  @PrimaryColumn()
  id_usuario: number;

  @PrimaryColumn()
  id_publico: number;

  @PrimaryColumn()
  id_adm: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Publico)
  @JoinColumn({ name: 'id_publico' })
  publico: Publico;

  @ManyToOne(() => Administrador)
  @JoinColumn({ name: 'id_adm' })
  administrador: Administrador;
}
