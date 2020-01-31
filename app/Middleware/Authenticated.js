'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Authenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request,response,auth,session }, next) {
    try{
      await auth.check()
    }catch(error){
      session.put('_intended',request.url())
      return response.redirect("/auth/login")
    }
    await next()
  }
}

module.exports = Authenticated
