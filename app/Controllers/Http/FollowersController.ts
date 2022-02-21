import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Follower/StoreValidator'

export default class FollowersController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response, params }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    try {
      const user = await User.findOrFail(params.user_id)
      await user.related('followers').attach([data.followedId])

      return response.created({ message: 'Seguindo' })
    } catch (error) {
      return response.internalServerError({ error: { message: 'Falha ao seguir' } })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
