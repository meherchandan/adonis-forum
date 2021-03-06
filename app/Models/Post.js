'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static boot(){
        super.boot();
        this.addTrait('Slugify')
    }
    static get dates(){
         return super.dates.concat(['last_reply_at'])
    }

    static castDates(field,value){
        if(['created_at','updated_at','last_reply_at'].includes(field)){
            return `${value.fromNow(true)} ago`
        }
        return super.formatDates(field,value)
    }
    static scopeForIndex(builder){
        return builder
            .with('tag')
            .with('user')
            .with('replies')
            .with('lastReply')
            .with('lastReply.user')
            .whereNull('parent_id')
            .orderBy('last_reply_at','desc')
    }

    tag(){
        return this.belongsTo('App/Models/Tag')
    }
    user(){
        return this.belongsTo('App/Models/User')
    }
    replies(){
        return this.hasMany('App/Models/Post','id','parent_id').orderBy('created_at','asc')
    }

    answer(){
        return this.hasOne('App/Models/Post','answer_id','id').orderBy('created_at','asc')
    }

    lastReply(){
        return this.hasOne('App/Models/Post','id','parent_id').orderBy('created_at','asc')
    }
}

module.exports = Post
