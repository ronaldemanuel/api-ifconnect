import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RefactorClassrooms extends BaseSchema {
  private tableName = 'classrooms'
  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('banner_id')
        .references('id')
        .inTable('media')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('banner_id')
      table.dropColumn('banner_id')
    })
  }
}
