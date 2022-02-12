import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserClassroomValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    classroomId: schema.number([
      rules.required(),
      rules.exists({ column: 'id', table: 'classrooms' }),
    ]),
  })

  public messages = {
    'classroomId.required': 'é necessário passar o grupo',
    'classroomId.exists': 'o grupo não existe',
  }
}
