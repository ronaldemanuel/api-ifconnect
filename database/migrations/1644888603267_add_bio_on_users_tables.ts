import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddBioOnUsersTables extends BaseSchema {
  private tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('bio').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('bio')
    })
  }
}
