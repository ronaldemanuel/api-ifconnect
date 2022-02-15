import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddClassroomIdOnPosts extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('classroom_id')
        .notNullable()
        .references('id')
        .inTable('classrooms')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('classroom_id')
    })
  }
}
