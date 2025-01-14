/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('users', 'UsersController')
  .middleware({ update: ['auth'], destroy: ['auth'], index: ['auth'], show: ['auth'] })
  .apiOnly()

Route.resource('classrooms', 'ClassroomsController')
  .middleware({ '*': ['auth'] })
  .apiOnly()

Route.get('classrooms/:id/members', 'ClassroomsController.members').middleware(['auth'])

Route.post('/auth', 'AuthController.store')

Route.resource('/media', 'MediaController')
  .middleware({ '*': ['auth'] })
  .apiOnly()

Route.resource('events', 'EventsController')
  .middleware({ '*': ['auth'] })
  .apiOnly()

Route.resource('posts', 'PostsController')
  .middleware({ '*': ['auth'] })
  .apiOnly()

Route.resource('classrooms.posts', 'ClassroomPostsController')
  .middleware({ '*': ['auth'] })
  .apiOnly()

Route.group(() => {
  Route.post('posts/:post_id/likes', 'PostLikesController.store')
  Route.delete('posts/:post_id/likes', 'PostLikesController.destroy')
}).middleware(['auth'])

Route.resource('users.classrooms', 'UserClassroomsController')
  .middleware({ '*': ['auth'] })
  .apiOnly()

Route.resource('comments', 'CommentsController')
  .middleware({ '*': ['auth'] })
  .apiOnly()
Route.get('comments/:post_id', 'CommentsController.indexByPost').middleware(['auth'])

Route.group(() => {
  Route.post('comments/:comment_id/likes', 'CommentLikesController.store')
  Route.delete('comments/:comment_id/likes', 'CommentLikesController.destroy')
}).middleware(['auth'])

Route.resource('users.followers', 'FollowersController')
  .middleware({ '*': ['auth'] })
  .apiOnly()
