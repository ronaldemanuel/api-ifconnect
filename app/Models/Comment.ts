import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  BelongsTo,
  belongsTo,
  column,
  computed,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column({ columnName: 'post_id' })
  public postId: number

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column({ columnName: 'user_id' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, { serializeAs: null, pivotTable: 'like_comments' })
  public usersWhoLike: ManyToMany<typeof User>

  @beforeFetch()
  @beforeFind()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof Comment>) {
    query.preload('usersWhoLike')
  }

  @computed()
  public get likes() {
    return this.usersWhoLike ? this.usersWhoLike.length : 0
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
