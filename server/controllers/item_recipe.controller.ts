import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'server/providers/services/users.service';
import { ItemAndRecipeService } from 'server/providers/services/item_recipe.service';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { Item } from 'server/entities/item.entity';
import { Recipe } from 'server/entities/recipe.entity';

class ItemBody {
  name: string;
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
    const items = await this.itemAndRecipeService.findAllItems(jwtBody.userId);
    const recipes = await this.itemAndRecipeService.findAllRecipes(jwtBody.userId);

    return { items, recipes };
  }

  @Post('/items')
  public async createItem(@JwtBody() jwtBody: JwtBodyDto, @Body() body: ItemBody) {
    let item = new Item();
    item.favorite = false;
    item.recent = new Date().getTime();
    item.name = body.name;
    item.userId = jwtBody.userId;
    item = await this.itemAndRecipeService.createItem(item);
    console.log(item);
    return { item };
  }

  @Post('/recipes')
  public async createRecipe(@JwtBody() jwtBody: JwtBodyDto, @Body() body: RecipeBody) {
    let recipe = new Recipe();
    recipe.userId = jwtBody.userId;
    recipe.name = body.name;
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
