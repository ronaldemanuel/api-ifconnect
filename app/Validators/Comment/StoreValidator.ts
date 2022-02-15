import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    text: schema.string({}, [rules.required()]),
    userId: schema.number([rules.required(), rules.exists({ column: 'id', table: 'users' })]),
    postId: schema.number([rules.required(), rules.exists({ column: 'id', table: 'posts' })]),
  })

  public messages = {
    'text.required': 'o comentário precisa de um texto',
    'userId.required': 'o comentário deve pertencer a um usuário',
    'userId.exists': 'o usuário não existe',
    'postId.required': 'o comentário deve estar em um post',
    'postId.exists': 'o post não existe',
  }
}
