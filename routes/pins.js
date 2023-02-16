const router = require('express').Router();
// import browserEnv from 'browser-env';
// browserEnv(['navigator']);

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

//search based on area name
router.get('/searcharea/:key', async (req, res) =>{
    try{
        const pins = await Pin.find(
            {"area":{$regex : req.params.key}}
        );
        res.status(200).json(pins);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//search based on hospital name
router.get('/searchname/:key', async (req, res) =>{
    try{
        const pins = await Pin.find(
            {"name":{$regex : req.params.key}}
        );
        // res.writeHead(200,{'Content-type':'text/html'});
        // res.write(pins);
        res.status(200).json(pins);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//search based on pin code
router.get('/searchpin/:key', async (req, res) =>{
    try{
        const pins = await Pin.find(
            {"pin":{$regex : req.params.key}}
        );
        res.status(200).json(pins);
    }
    catch(err){
        res.status(500).json(err);
    }
})

exports.find = function(req, res) {
    console.log("jm: lat: " + req.body.lat);
    console.log("jm: long: " + req.body.long);
}

// router.post('/toilets',async (req,res) =>  {
//     console.log("jm: lat: " + req.body.lat);
//     console.log("jm: long: " + req.body.long);
//     console.log("jm: distance: " + req.body.distance);
  
//     let toilets = await Toilet.find({
//       loc: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [req.body.long, req.body.lat]
//           },
//           $minDistance: 0,
//           $maxDistance: req.body.distance
//         }
//       }
//     }).limit(3).find((err, toiletResults) => {
//       console.log("jm: toilet results: ", JSON.stringify(toiletResults, 0, 2));
  
//       if (err) {
//         res.json({
//           status: "error",
//           message: err
//         });
//       }
//       res.json({
//         status: "success",
//         message: "Toilets retrieved successfully",
//         data: toiletResults
//       });
//     });

// });

//around my location
// var c = 0;
// var d = 0;

// c,d = getLocation();
router.get('/myloc', async (req, res) =>{
    
    try{
        let c = 12;
        let d = 77;

        const [a,b] = latlongrange(c,d);

        let p = c-a;
        let q = c+a;
        let t = d-b;
        let r = d+b;

        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        
        const pins = await Pin.find({ $and: [ { lat : {$lte : q} }, { lat : {$gte : p} }, { long : {$gte : t} }, { long : {$lte : r} }]}  );
        res.status(200).json(pins);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// function getLocation() {
//         if (global.navigator.geolocation) {
//           global.navigator.geolocation.getCurrentPosition(showPosition);
//         } else {
//           console.log("geolocation not supported");
//       }
// }

// function showPosition(position) {
//     // x.innerHTML = "Latitude: " + position.coords.latitude +
//     // "<br>Longitude: " + position.coords.longitude;
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//     return (latitude, longitude);
    
//   }
var rad = function(x) {
    return x * Math.PI / 180;
  };
  
function latlongrange(l,m){  
  var R = 6378137; // Earth’s mean radius in meter
  let origin = {lat: l, lng: m}
  
  let latDist = R * rad(1)
  let lngDist = R * rad(1) * Math.cos(rad(origin.lat))
  
  console.log(latDist, lngDist);
  
  let areaRadius = 200000000000; // in meters
  
  let latitudeRangeDelta = areaRadius / latDist;
  let longitudeRangeDelta = areaRadius / lngDist;
  
  a = latitudeRangeDelta;
  b = longitudeRangeDelta;

  return [latitudeRangeDelta, longitudeRangeDelta];

//   console.log('latitude of the area is within range [' + (origin.lat - latitudeRangeDelta) + ', ' + (origin.lat + latitudeRangeDelta) + ']')
//   console.log('longitude of the area is within range [' + (origin.lng - longitudeRangeDelta) + ', ' + (origin.lng + longitudeRangeDelta) + ']')
}
//   //area range end






router.get('/search/location', async (req, res) => {
    try {
      const { lat, lng } = req.query;
      const pins = await Pin.find({
        loc: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: 1000 // 10 km
          }
        }
      });
      res.status(200).json(pins);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  



  //search based on location name
// router.get('/searcharea/:key', async (req, res) =>{
//     try{
//         const pins = await Pin.find({
//             location: {
//               $near: {
//                 $geometry: {
//                   type: 'Point',
//                   coordinates: [lng, lat],
//                 },
//                 $maxDistance: 1000,
//               },
//             },
//           })
//         res.status(200).json(pins);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

module.exports = router;