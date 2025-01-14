import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional(),
    subject: schema.string.optional(),
    userId: schema.number.optional([rules.exists({ table: 'users', column: 'id' })]),
    bannerId: schema.number.optional([
      rules.required(),
      rules.exists({ column: 'id', table: 'media' }),
    ]),
  })

  public messages = {
    'userId.exists': 'esse usuário não existe',
    'bannerId.exists': 'esse banner não existe',
  }
}
