const route = require("express").Router()
const routeArticle = require("./article")

route.use("/", routeArticle)

module.exports = route