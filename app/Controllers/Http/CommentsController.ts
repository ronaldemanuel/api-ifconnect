import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import StoreValidator from 'App/Validators/Comment/StoreValidator'

export default class CommentsController {
  public async index({}: HttpContextContract) {
    const comments = await Comment.query()
    return comments
  }

  public async indexByPost({ params }: HttpContextContract) {
    const comments = await Comment.query().where('post_id', '=', params.post_id)
    return comments
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    try {
      const comment = await Comment.create(data)
      return comment
    } catch (error) {
      return response.status(500).json({ error: { message: 'fail to create comment' } })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.id)
      await comment.delete()
    } catch (error) {
      return response.internalServerError({ error: { message: 'fail to delete comment' } })
    }
  }
}
