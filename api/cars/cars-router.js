// DO YOUR MAGIC
const express = require('express')
const Cars= require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
  }= require('./cars-middleware')
const router = express.Router()

router.get('/', async (req, res)=>{
   await Cars.getAll()
   .then(cars=>{
       res.status(200).json(cars)
   })
   .catch(err=>{})
})
router.get('/:id', checkCarId,async(req,res)=>{
    res.json(req.validateIdCar)
})

router.post('/',
 checkCarPayload,
 checkVinNumberValid,
 checkVinNumberUnique,
 async (req, res,next)=>{
    try{
        const newCar= await Cars.create(req.body)
        res.status(201).json(newCar)
    }
    catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message:err.message
    })
  })
module.exports = router;