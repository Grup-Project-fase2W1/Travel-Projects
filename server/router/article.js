const route = require("express").Router()
const ArticleController = require("../controllers/articleController")
const UserController = require("../controllers/userController")

route.get("/article", ArticleController.getDataZomato)
route.post("/googleLogin", UserController.googleLogin)
route.get("/weather", ArticleController.weather)
route.get("/holiday", ArticleController.holiday)


module.exports = route