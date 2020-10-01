const {Travel} = require('../models/index')

class TravelController{
    static listHandler(req,res,next){
        Travel.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })

    }

    static addHandler(req,res,next){
        const input = {
            title: req.body.title,
            destination: req.body.destination,
            date: req.body.date,
            status: req.body.status,
            UserId: +req.userData.id
        }
        Travel.create(input)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static async findHandler(req,res,next){
        try{
           const resultFind = await Travel.findByPk(+req.params.id)

           if(resultFind){
               res.status(200).json(resultFind)
           }
           else{
            next({name: 'Not Found', message: 'Data not found!'})
           }
        }
        catch(err){
            next(err)
        }
    }

    static async putHandler(req,res,next){
        try{
            const inputBody = {
                title: req.body.title,
                destination: req.body.destination,
                status: req.body.status,
                date: req.body.date,
                UserId: req.userData.id
            }
            const resultPut = await Travel.update(inputBody,{where:{
                id:+req.params.id
            }})

            if(!resultPut[0]){
                next({name: 'Not Found', message: 'Data not found!'})
            }
            else{
                res.status(200).json(await Travel.findByPk(+req.params.id))
            }
        }   
        catch(err){
            next(err)
        }
    }

    static async patchHandler(req,res,next){
        try{
            const inputBody = { status: req.body.status, UserId: req.userData.id}
            
            const resultPatch = await Travel.update(inputBody,{where:{
                id:+req.params.id
            }})

            if(!resultPatch[0]){
                next({name: 'Not Found', message: 'Data not found!'})
            }
            else{
                res.status(200).json(await Travel.findByPk(+req.params.id))
            }
        }
        catch(err){
            next(err)
        }

    }

    static async deleteHandler(req,res){
        try{
            const resultDelete = await Travel.destroy({where:{id:+req.params.id}})

            if(resultDelete){
                res.status(200).json({message: "Travel success to delete"})
            } 
            else{
                next({name: 'Not Found', message: 'Data not found!'})
            }

        }
        catch(err){
            next(err)
        }
    }
    
}

module.exports = TravelController