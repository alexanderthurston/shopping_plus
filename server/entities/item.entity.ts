import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  favorite: boolean;

  @Column()
  recent: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.items)
  recipe: Recipe;
}
