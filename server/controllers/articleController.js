const { Arcticle } = require("../models/index")
const axios = require("axios")


class ArticleController {

    static getDataZomato(req, res, next) {
        // res.send("ok")
        axios({
            method: "GET",
            url: `https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&start=1&count=90&sort=rating`,
            headers: {
                "user-key": process.env.USER_KEY
            }

        })
            .then(response => {
                // let newRest = response.data
                // res.send(newRest)
                let resto = response.data.restaurants
                let result = []
                resto.forEach(el => {

                    let value = {
                        name: el.restaurant.name,
                        alamat: el.restaurant.location.address,
                        phone: el.restaurant.phone_numbers,
                        img: el.restaurant.thumb,
                        url: el.restaurant.url

                    }
                    result.push(value)

                });

                // res.status(200).json(resto)
                res.status(200).json(result)
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
                arr.push(obj1)

                return axios({
                    method: "GET",
                    url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=Bandung`,
                })
            })
            .then(response => {
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
            .then(response => {
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
            .then(response => {
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
            .then(response => {
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

    static holiday(req,res,next){
        axios({
            method: "GET",
            url: `https://holidayapi.com/v1/holidays?pretty&key=${process.env.HOLIDAY_KEY}&country=ID&year=2019`,
        })
            .then(response => {
                let holiday = response.data.holidays
                let result = []

                holiday.forEach(el => {
                    //console.log(el.name)
                    let value = {
                        name: el.name,
                        date: el.date,
                    }
                    result.push(value)
                });
                res.status(200).json(result)
                

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ArticleController