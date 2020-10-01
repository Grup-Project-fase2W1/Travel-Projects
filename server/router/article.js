const route = require("express").Router()
const ArticleController = require("../controllers/articleController")

route.get("/article", ArticleController.getDataZomato)
route.get("/weather", ArticleController.weather)


module.exports = route