import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemAndRecipeController } from 'server/controllers/item_recipe.controller';
import { Item } from 'server/entities/item.entity';
import { Recipe } from 'server/entities/recipe.entity';
import { ItemAndRecipeService } from 'server/providers/services/item_recipe.service';
import { UsersService } from 'server/providers/services/users.service';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Recipe]), UsersModule], //entities
  controllers: [ItemAndRecipeController], //controllers
  providers: [ItemAndRecipeService, UsersService], //services
  exports: [TypeOrmModule],
})
export class ItemsAndRecipesModule {}
