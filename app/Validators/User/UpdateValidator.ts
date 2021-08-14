import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string.optional({}, []),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string.optional({}, [rules.minLength(8)]),
    isTeacher: schema.boolean.optional(),
  })
  public messages = {
    'email.email': 'o campo precisa ser formatado como um email',
    'email.unique': 'este endereço de email já existe',
    'password.minLength': 'a senha precisa ter no minimo 8 caracteres',
  }
}
