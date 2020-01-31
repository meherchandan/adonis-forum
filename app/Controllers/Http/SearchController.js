'use strict'

const Post = use('App/Models/Post')
class SearchController {
    async index({view,request}){
        if(request.input('q')){
            let posts  = await Post.query()
            .forIndex()
            .whereRaw('MATCH (title,body) AGAINST (? IN BOOLEAN MODE)',request.input('q'))
           .paginate(request.input('page',1),2)
            return view.render('index',{posts})
        }
        else{
            let posts  = await Post.query()
            .forIndex()
           .paginate(request.input('page',1),2)
            return view.render('index',{posts})
        }
    }
}

module.exports = SearchController
