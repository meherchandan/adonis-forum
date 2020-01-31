'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/','HomeController.index').as('home')

Route.get('/search','SearchController.index').as('search')

Route.post('/posts/:slug/answer','PostAnswerController.store')
    .as('posts.answer.store')
    .middleware(['auth'])

Route.delete('/posts/:slug/answer','PostAnswerController.destroy')
    .as('posts.answer.destroy')
    .middleware(['auth'])

Route.post('/posts/:slug/reply','PostReplyController.store')
    .as('posts.reply.store')
    .middleware(['auth'])

Route.get('/posts/create','PostController.create')
    .as('posts.create')
    .middleware(['auth'])

Route.post('/posts','PostController.store')
    .as('posts.store')
    .middleware(['auth'])

Route.get('/posts/unanswered','UnansweredPostController.index')
    .as('post.unanswered')

Route.get('/posts/own','OwnPostController.index')
    .as('post.own')
    .middleware(['auth'])

Route.get('/tag/:slug','TagPostController.index')
    .as('post.tags')

Route.get('/posts/:slug','PostController.show')
    .as('posts.show')

Route.get('/auth/register','Auth/RegisterController.index')
    .as('auth.register')
    .middleware(['guest'])

Route.post('/auth/register','Auth/RegisterController.register')
    .as('auth.register')
    .middleware(['guest'])

Route.get('/auth/login','Auth/LoginController.index')
    .as('auth.login')
    .middleware(['guest'])
    
Route.post('/auth/login','Auth/LoginController.login')
    .as('auth.login')
    .middleware(['guest'])

    Route.post('/auth/logout','Auth/LoginController.logout')
    .as('auth.logout')
    .middleware(['auth'])
