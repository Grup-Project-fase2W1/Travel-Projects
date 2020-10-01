const route = require("express").Router()
const ArticleController = require("../controllers/articleController")
const UserController = require("../controllers/userController")

route.get("/article", ArticleController.getDataZomato)
route.get("/weater", ArticleController.weater)
route.post("/googleLogin", UserController.googleLogin)


module.exports = route