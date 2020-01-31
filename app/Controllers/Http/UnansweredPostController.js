'use strict'

const Post = use('App/Models/Post')

class UnansweredPostController {
    async index({view}){
        let posts = await Post.query()
        .forIndex()
        .doesntHave('replies')
        .fetch()
        return view.render('index',{posts}) 
    }
}

module.exports = UnansweredPostController
