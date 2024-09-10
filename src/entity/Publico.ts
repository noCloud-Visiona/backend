import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publico {
  @PrimaryGeneratedColumn()
  id_publico: number;
}
