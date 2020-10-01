const { Arcticle } = require("../models/index")
const axios = require("axios")

class ArticleController {

    static getDataZomato(req, res, next) {
        // res.send("ok")
        axios({
            method: "GET",
            url: `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&start=1&count=30&sort=rating`,
            headers: {
                "user-key": process.env.USER_KEY
            }
        })
            .then(response => {
                let resto = response.data.restaurants
                let result = []

                resto.forEach(el => {

                    let value = {
                        name: el.restaurant.name,
                        alamat: el.restaurant.location.address,
                        phone: el.restaurant.phone_numbers,

                    }
                    result.push(value)

                });
                // console.log(result)
                res.status(200).json(response.data.restaurants)
                // res.status(200).json(result)


                // res.send(JSON.stringify(response))
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static weater(req, res, next) {
        axios({
            method: "GET",
            url: `api.openweathermap.org/data/2.5/weather?q=London&appid=f98441ee486d155139e45b5fde4d3f27`,
            // headers: {
            //     "appid": "db6970e7eff63a602091cbe30fd37a96"
            // }
        })
            .then(response => {
                res.status(200).json(response.data)
                // res.send(JSON.stringify(response))
            })
            .catch(err => {
                // console.log(err)
                res.status(404).json(err)
            })
    }
}

module.exports = ArticleController