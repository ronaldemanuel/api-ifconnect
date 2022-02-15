import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddBannerIdOnUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('banner_id')
        .nullable()
        .references('id')
        .inTable('media')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('banner_id')
    })
  }
}
