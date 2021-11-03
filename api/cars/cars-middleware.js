const Cars = require('./cars-model')
const db=require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
   const existing= await Cars.getById(req.params.id)
   if(!existing){
     res.status(404).json({message: "car with id <car id> is not found"})
   } else { 
     req.validateIdCar= existing
     next()
   }
  }
  catch(err){
    next(err)
  }
  
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC

}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}