'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFulltextToPostSchema extends Schema {
  up () {
   this.raw("ALTER TABLE posts ADD FULLTEXT (`title`,`body`) ")
  }

  down () {
   
  }
}

module.exports = AddFulltextToPostSchema
