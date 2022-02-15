import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'

export default class CommentLikesController {
  public async store({ params, auth, response }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.comment_id)
      if (auth.user) {
        await comment.related('usersWhoLike').attach([auth.user.id])
      }
    } catch (error) {
      return response.status(404).send({ error: { message: 'comment not found' } })
    }
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.comment_id)
      if (auth.user) {
        await comment.related('usersWhoLike').detach([auth.user.id])
      }
    } catch (error) {
      return response.status(404).send({ error: { message: 'comment not found' } })
    }
  }
}
