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
                        img: el.restaurant.thumb

                    }
                    result.push(value)

                });
                // console.log(result)
                // res.status(200).json(response.data.restaurants)
                res.status(200).json(result)


                // res.send(JSON.stringify(response))
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static weather(req, res, next) {
        let arr = []
        axios({
            method: "GET",
            url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=Jakarta`,
        })
        .then(response => {
            
            let obj1 = {
                city: response.data.location.name,
                temperature: response.data.current.temperature,
                description: response.data.current.weather_descriptions[0]
            }
            // console.log(obj1)
            arr.push(obj1)
            //console.log(arr)
            //res.status(200).json(response.data)
            // res.send(JSON.stringify(response))
            return axios({
                method: "GET",
                url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=Bandung`,
            })
        })
        .then(response=>{
            let obj2 = {
                city: response.data.location.name,
                temperature: response.data.current.temperature,
                description: response.data.current.weather_descriptions[0]
            }
            //console.log(obj2)
            arr.push(obj2)
            return axios({
                method: "GET",
                url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=Semarang`,
            })
        })
        .then(response=>{
            let obj3 = {
                city: response.data.location.name,
                temperature: response.data.current.temperature,
                description: response.data.current.weather_descriptions[0]
            }
            //console.log(obj3)
            arr.push(obj3)
            return axios({
                method: "GET",
                url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=Yogyakarta`,
            })
        })
        .then(response=>{
            let obj4 = {
                city: response.data.location.name,
                temperature: response.data.current.temperature,
                description: response.data.current.weather_descriptions[0]
            }
            //console.log(obj4)
            arr.push(obj4)
            return axios({
                method: "GET",
                url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=Surabaya`,
            })
        })
        .then(response=>{
            let obj5 = {
                city: response.data.location.name,
                temperature: response.data.current.temperature,
                description: response.data.current.weather_descriptions[0]
            }
            // console.log(obj5)
            arr.push(obj5)
            res.status(200).json(arr)
        })
        .catch(err => {
            // console.log(err)
            res.status(404).json(err)
        })
    }
}

module.exports = ArticleController