import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'server/providers/services/users.service';
import { ItemAndRecipeService } from 'server/providers/services/item_recipe.service';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { Item } from 'server/entities/item.entity';
import { Recipe } from 'server/entities/recipe.entity';
import { update } from 'lodash';

class ItemBody {
  name: string;
  favorite: boolean;
  onShoppingList: boolean;
  checked: boolean;
}

class RecipeBody {
  name: string;
  items: Item[];
}

@Controller()
export class ItemAndRecipeController {
  constructor(private itemAndRecipeService: ItemAndRecipeService, private usersService: UsersService) {}

  @Get('/all')
  public async index(@JwtBody() jwtBody: JwtBodyDto) {
    const allItems = await this.itemAndRecipeService.findAllItems(jwtBody.userId);
    const allRecipes = await this.itemAndRecipeService.findAllRecipes(jwtBody.userId);

    return { allItems, allRecipes };
  }

  @Post('/items')
  public async createItem(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ItemBody) {
    let item = new Item();
    item.favorite = body.favorite;
    item.recent = new Date().getTime();
    item.checked = body.checked;
    item.onShoppingList = body.onShoppingList;
    item.name = body.name;
    item.userId = jwtBody.userId;
    item = await this.itemAndRecipeService.createItem(item);
    return { item };
  }

  @Put('/items/:id')
  public async updateItem(@Param('id') id: number, @Body() body: ItemBody) {
    let updatedItem = await this.itemAndRecipeService.findItemById(id);
    updatedItem.name = body.name;
    updatedItem.favorite = body.favorite;
    updatedItem.recent = new Date().getTime();
    updatedItem.checked = body.checked;
    updatedItem.onShoppingList = body.onShoppingList;

    updatedItem = await this.itemAndRecipeService.createItem(updatedItem);
    updatedItem = await this.itemAndRecipeService.findItemById(updatedItem.id);
    return { updatedItem };
  }

  @Delete('/items/:id')
  public async destroyItem(@JwtBody() jwtBody: JwtBodyDto, @Param('id') id: number) {
    const item = await this.itemAndRecipeService.findItemById(id);
    if (item.userId != jwtBody.userId) {
      throw new HttpException('Unauthorized', 401);
    }
    this.itemAndRecipeService.deleteItem(item);
    return { success: true };
  }

  @Post('/recipes')
  public async createRecipe(@JwtBody() jwtBody: JwtBodyDto, @Body() body: RecipeBody) {
    let recipe = new Recipe();
    recipe.userId = jwtBody.userId;
    recipe.name = body.name;
    recipe.items = body.items;
    recipe = await this.itemAndRecipeService.createRecipe(recipe);
    return { recipe };
  }

  @Put('/recipes/:id')
  public async updateRecipe(@Param('id') id: string, @JwtBody() jwtBody: JwtBodyDto, @Body() body: RecipeBody) {
    let recipe = await this.itemAndRecipeService.findRecipeById(parseInt(id, 10));
    recipe.items = body.items;
    recipe = await this.itemAndRecipeService.createRecipe(recipe);
  }
}
