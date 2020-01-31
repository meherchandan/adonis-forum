'use strict'

const {validateAll} = use('Validator')

 class LoginController {
    index({view}){
        return view.render('auth.login')
    }
    async login({request,response,session,auth}){
        const {email,password} = request.all();
        const rules={
            email:'required|email',
            password:'required'
        }
    const validation = await validateAll(request.all(),rules);
    if(validation.fails()){
        session.withErrors(validation.messages()).flashAll();
        return response.redirect('back');
    }
    await auth.attempt(email,password)
    console.log('login',session.get('_intended'))
    if(session.get('_intended',false)){
        let oldurl= session.get('_intended')
        session.forget('_intended')
        return response.redirect(oldurl) 

    }
    return response.route('home')

    }

    async logout({response,auth}){
        await auth.logout()
        return response.route('home')

    }
}

module.exports = LoginController
