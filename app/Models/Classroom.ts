import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'
import Media from './Media'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subject: string

  @column()
  public name: string

  @column()
  public userId: number

  @column()
  public bannerId: number

  @belongsTo(() => Media, { foreignKey: 'bannerId' })
  public bannerPhoto: BelongsTo<typeof Media>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, { pivotTable: 'user_classrooms' })
  public members: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
