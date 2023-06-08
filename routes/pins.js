const router = require('express').Router();
const Pin = require('../models/Pin');

router.post('/', async (req,res) => {
    const newPin = new Pin(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
})

//get all pins
router.get('/', async (req, res) =>{
    try{
        const pins = await Pin.find();
        res.status(200).json(pins);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// //search based on area name
// router.get('/searcharea/:key', async (req, res) =>{
//     try{
//         const pins = await Pin.find(
//             {"area":{$regex : req.params.key}}
//         );
//         res.status(200).json(pins);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

//search based on hospital name
router.post('/searchname', (req, res) => {
    const nameval = req.body.name
    console.log(nameval);
    Pin.find({"name":nameval}
    ).then(results => {
      console.log("hello");
      console.log(results);
      res.json(results);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
  });

  //search based on area name
router.post('/searcharea', (req, res) => {
    const nameval = req.body.name
    console.log(nameval);
    Pin.find({"name":nameval}
    ).then(results => {
      console.log("hello");
      console.log(results);
      res.json(results);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
  });

  //search based on pincode
router.post('/searchpin', (req, res) => {
    const pinval = req.body.pin
    console.log(pinval);
    Pin.find({"pin":{$eq:{pinval}}}
    ).then(results => {
      console.log("hello");
      console.log(results);
      res.json(results);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
  });

// //search based on pin code
// router.get('/searchpin/:key', async (req, res) =>{
//     try{
//         const pins = await Pin.find(
//             {"pin":{$regex : req.params.key}}
//         );
//         res.status(200).json(pins);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

router.post('/search', (req, res) => {
    const dist = req.body.dist
    const [longitude, latitude] = req.body.loc.coordinates;
    console.log(req.body);
    console.log(latitude);
    console.log(typeof(latitude));
    console.log(typeof(Pin))
    Pin.find({
      loc:{
        $geoWithin:{
          $centerSphere:[[longitude,latitude],dist/3963.2]
        }
      }
    }
    ).then(results => {
      console.log("hello");
      console.log(results);
      res.json(results);
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
  });


  router.post('/addnewpins', async (req,res) => {
    const newPin = new Pin(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;
