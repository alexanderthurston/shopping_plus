import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'server/entities/item.entity';
import { Recipe } from 'server/entities/recipe.entity';

@Injectable()
export class ItemAndRecipeService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  findAllItems(userId: number): Promise<Item[]> {
    return this.itemsRepository.find({
      where: { userId },
    });
  }

  findItemById(id: number): Promise<Item> {
    return this.itemsRepository.findOne({
      where: { id },
    });
  }

  createItem(item: Item): Promise<Item> {
    return this.itemsRepository.save(item);
  }

  findAllRecipes(userId: number): Promise<Recipe[]> {
    return this.recipesRepository.find({
      where: { userId },
      relations: ['items'],
    });
  }

  findRecipeById(id: number): Promise<Recipe> {
    return this.recipesRepository.findOne({
      where: { id },
    });
  }

  createRecipe(recipe: Recipe): Promise<Recipe> {
    return this.recipesRepository.save(recipe);
  }
}
