import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/UserClassrooms/StoreValidator'

export default class UserClassroomsController {
  public async index({ request, response, params }: HttpContextContract) {
    try {
      const { limit, offset = 1 } = request.qs()
      const members = await User.findOrFail(params.user_id)
      const classrooms = limit
        ? members.related('classrooms').query().paginate(offset, limit)
        : members.related('classrooms').query()
      return classrooms
    } catch (error) {
      return response.notFound({ message: 'classrooms nos found' })
    }
  }

  public async store({ request, params, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    try {
      const member = await User.findOrFail(params.user_id)
      await member.related('classrooms').attach([data.classroomId])
      return response.created({ message: 'Usuário adicionado ao grupo com sucesso' })
    } catch (error) {
      return response.internalServerError({ message: 'Usuário já adicionado ao grupo' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const member = await User.findOrFail(params.user_id)
      await member.related('classrooms').detach([params.id])
      return true
    } catch (error) {
      return response.internalServerError({ message: 'Falhar ao sair do grupo' })
    }
  }
}
