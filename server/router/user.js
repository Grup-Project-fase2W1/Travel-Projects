const route = require('express').Router()
const UserController = require('../controllers/userController')


route.get('/',(req,res)=>{
    res.send('cccc')
})

route.post('/register',UserController.registerHandler)
route.post('/login',UserController.loginHandler)

module.exports = route


