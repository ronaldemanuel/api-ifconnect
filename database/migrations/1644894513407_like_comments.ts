import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LikeComments extends BaseSchema {
  protected tableName = 'like_comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('comment_id')
        .notNullable()
        .references('id')
        .inTable('comments')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.unique(['user_id', 'comment_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
