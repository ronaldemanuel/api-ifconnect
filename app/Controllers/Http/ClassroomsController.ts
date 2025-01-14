import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Classroom from 'App/Models/Classroom'
import StoreValidator from 'App/Validators/Classroom/StoreValidator'
import UpdateValidator from 'App/Validators/Classroom/UpdateValidator'

export default class ClassroomsController {
  public async index({}: HttpContextContract) {
    const classrooms = await Classroom.query()
    return classrooms
  }

  public async members({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)
      return classroom.related('members').query()
    } catch (error) {
      return response.notFound({ message: 'grupo não encontrado' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    try {
      const classroom = await Classroom.create(data)
      return classroom
    } catch (error) {
      return response.badRequest({ message: 'falha ao criar grupo' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)
      return classroom
    } catch (error) {
      return response.notFound({ message: 'grupo não encontrado' })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const classroom = await Classroom.findOrFail(params.id)
      classroom.merge(data)
      return classroom
    } catch (error) {
      return response.notFound({ message: 'grupo não encontrado' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const classroom = await Classroom.findOrFail(params.id)
      await classroom.delete()
    } catch (error) {
      return response.notFound({ message: 'grupo não encontrado' })
    }
  }
}
