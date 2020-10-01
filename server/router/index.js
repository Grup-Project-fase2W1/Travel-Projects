const route = require('express').Router()
const travel = require('../router/travel')
const user = require('../router/user')

route.get('/',(req,res)=>{
    res.send('aaa')
})


route.use('/travel',travel)
route.use('/user',user)



module.exports = route