import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddItemsAndRecipes1649887709114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'favorite',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'recent',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'onShoppingList',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'checked',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'recipeId',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'recipe',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'item',
      new TableForeignKey({
        columnNames: ['recipeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipe',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
    await queryRunner.dropTable('recipe');
  }
}
