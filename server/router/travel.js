const route = require('express').Router()
const TravelController = require('../controllers/travelController')
const {authentication, authorization} = require('../middlewares/middleware')

route.use(authentication)
route.get('/',TravelController.listHandler)
route.post('/',TravelController.addHandler)
route.get('/:id',authorization,TravelController.findHandler)
route.put('/:id',authorization,TravelController.putHandler)
// route.patch('/:id',authorization,TravelController.patchHandler)
route.delete('/:id',authorization,TravelController.deleteHandler)


module.exports = route