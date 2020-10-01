const route = require('express').Router()
const travel = require('../router/travel')
const user = require('../router/user')
const routeArticle = require("./article")


route.use('/travel',travel)
route.use('/user',user)
route.use('/', routeArticle)


module.exports = route