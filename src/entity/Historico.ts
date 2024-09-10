import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Historico {
  @PrimaryGeneratedColumn()
  id_historico: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  data: string;
}
