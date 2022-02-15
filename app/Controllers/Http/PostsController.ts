import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/Post/StoreValidator'
import UpdateValidator from 'App/Validators/Post/UpdateValidator'

export default class PostsController {
  public async index({ auth }: HttpContextContract) {
    if (auth.user) {
      const user = auth.user
      const classrooms = await user.related('classrooms').query()

      let classroomPosts: Post[] = []
      classrooms.forEach(async (c) => {
        const posts = await Post.query().where('classroom_id', '=', c.id)
        classroomPosts.push(...posts)
      })

      // Do not delete this line
      const classroomPostsTest = await Post.query().where('classroom_id', '=', classrooms[0].id)

      return classroomPosts
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await Post.create(data)
    return post
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      return post
    } catch (err) {
      return response.status(404).json({ error: { message: 'post not found' } })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    try {
      const post = await Post.findOrFail(params.id)
      post.merge(data)
      await post.save()
      return post
    } catch (err) {
      return response.status(400).json({ error: { message: 'post not found' } })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)
      await post.delete()
    } catch (error) {
      return response.status(400).json({ error: { message: 'post not found' } })
    }
  }
}
