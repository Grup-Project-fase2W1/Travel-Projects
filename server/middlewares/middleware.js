const jwt = require('jsonwebtoken')
const {User,Travel} = require('../models/index')

const authentication = (req,res,next) =>{
    const {access_token} = req.headers
    if(access_token){
        const decode = jwt.verify(access_token, process.env.SECRET)
        req.userData = decode
        User.findByPk(req.userData.id)
        .then(data=>{
            if(!data){
                res.status(404).json({message: 'User not found'})
            }
            next()
        })
        .catch(err=>{
            res.status(500).json({message : err.message})
        })
    }
    else{
        res.status(401).json({message: 'You are not authenticated'})
    }
}

const authorization = (req,res,next)=>{
    const id = +req.params.id
    const userData = +req.userData.id
    Travel.findByPk(id)
    .then(data =>{
        if(!data){
            res.status(404).json({message: 'Data Travel not found'})
        }
        else if(userData !== data.UserId){
            console.log(userData,data.UserId)
            res.status(403).json({message: 'You dont have access'})
        }
        else{
            console.log(userData,data.UserId)
            next()
        }
    })
    .catch(err=>{
        next(err)
    })

}

module.exports = {authentication,authorization}