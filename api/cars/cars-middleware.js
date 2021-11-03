const Cars = require('./cars-model')
const db=require('../../data/db-config')
const vinValidator= require('vin-validator')
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
  if(vinValidator.validate(req.body.vin)){
    next()
  }else{
    next({
      status:400,
      message:`vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existing = await Cars.getByVin(req.body.vin)
    if(!existing){
      next()
    } else {
      next({status:400, message: `vin ${req.body.vin} already exists`})
    }
  } catch (err){
    next(err)
  }
}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}