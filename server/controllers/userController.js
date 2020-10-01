const { User } = require('../models')
const Helper = require('../helper/helper')
const { OAuth2Client } = require('google-auth-library');



class UserController {
    static async registerHandler(req, res, next) {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(obj)

            res.status(201).json({
                id: data.id,
                name: data.name,
                email: data.email
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async loginHandler(req, res, next) {
        const obj = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const data = await User.findOne({
                where: {
                    email: obj.email
                }
            })

            if (!data) {
                next({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }
            else if (!Helper.comparePassword(obj.password, data.password)) {
                next({
                    name: "Unauthorized",
                    message: "Wrong email/password"
                })
            }
            else {
                const obj = {
                    id: data.id,
                    email: data.email
                }
                const access_token = Helper.signToken(obj)
                res.status(200).json({
                    access_token
                })
                req.headers = access_token
            }


        }
        catch (err) {
            next(err)
        }
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ""
        let name = ""
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                // console.log(ticket)
                let payload = ticket.getPayload()
                email = payload['email']
                name = payload['name']

                return User.findOne({
                    where: {
                        email: email
                    }
                })
            })
            .then(user => {
                // console.log(user)
                if (!user) {
                    let value = {
                        name: name,
                        email: email,
                        password: "randompassword"
                    }
                    console.log(value, "valuee")
                    return User.create(value)
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = Helper.signToken({ id: user.id, email: user.email })
                console.log({ access_token })
                res.status(200).json({ access_token })
            })
            .catch(err => {
                // console.log(err)
            })
    }

}

module.exports = UserController