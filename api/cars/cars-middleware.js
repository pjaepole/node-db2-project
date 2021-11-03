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
  const {vin, make, model,mileage}=req.body
  if(!vin){
    res.status(400).json({ message: "vin is missing" })
  } 
  else if(!make){
    res.status(400).json({ message: "make is missing" })
  } 
  else if(!model){
    res.status(400).json({ message: "model is missing" })
  } 
  else if(!mileage){
    res.status(400).json({ message: "mileage is missing" })
  } 
  else{next()}
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const existing= await db('cars')
    .where('vin',req.body.vin.trim()).first()

    if(existing){
      
    }
  }
  catch(err){

  }
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