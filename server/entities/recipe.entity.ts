import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @OneToMany(() => Item, (item) => item.recipe, { cascade: true })
  items: Item[];
}
