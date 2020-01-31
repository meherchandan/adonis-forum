const {hooks} = require('@adonisjs/ignitor')
const pluralize = require('pluralize')
hooks.after.providersBooted(()=>{
    const view = use('View')
    const Tag = use('App/Models/Tag')
    Tag.all().then((tags)=>{
        view.global('tags',tags)
    }).catch(()=>{
        //
    })
view.global('pluralize',(singular,length)=>{
return pluralize(singular,length)
})

view.global('paginationArray',(total)=>{
    return Array.from(new Array(total),(value,index) =>index+1)
})

view.global('parseInt',(number)=>{
    return parseInt(number) 
})


const Database=use('Database')
const Validator=use('Validator')

const exists = async (data,field,message,args,get)=>{
    const value = get(data,field)
    if(!value){
        return
    }
    const [table,column] = args
    const found = await Database.table(table).where(column,value).first()
    if(!found){
        throw message 
    }
}

Validator.extend('exists',exists)
})