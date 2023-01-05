const router = require('express').Router();
// import browserEnv from 'browser-env';
// browserEnv(['navigator']);

const Pin = require('../models/Pin');
// const Geolocation = require('Geolocation');

//create a pin
let a = 0;
let b = 0;
let c = 0;
let d = 0;
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

router.get('/pincode', async (req, res) =>{
    try{
        const pins = await Pin.find({title:{$eq:"London"}});
        res.status(200).json(pins);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// //around my location
// c,d = getLocation();
// router.get('/myloc', async (req, res) =>{
//     try{
//         c,d = getLocation();
//         console.log(c,d);
//         latlongrange(c,d);
//         let p = c-a;
//         let q = c+a;
//         let t = d-b;
//         let r = d+b;
//         console.log(a,b,c,d);
//         const pins = await Pin.find({ $and: [ { lat : {$lte : q} }, { lat : {$gte : p} }, { long : {$gte : t} }, { long : {$lte : r} }]}  );
//         res.status(200).json(pins);
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })


// function getLocation() {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition);
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

//   // function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//   //   var R = 6371; // Radius of the earth in km
//   //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   //   var dLon = deg2rad(lon2-lon1); 
//   //   var a = 
//   //     Math.sin(dLat/2) * Math.sin(dLat/2) +
//   //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//   //     Math.sin(dLon/2) * Math.sin(dLon/2)
//   //     ; 
//   //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   //   var d = R * c; // Distance in km
//   //   x = d;
//   //   return d;
//   // }
  
//   // function deg2rad(deg) {
//   //   return deg * (Math.PI/180)
//   // }
// //area range
//   var rad = function(x) {
//     return x * Math.PI / 180;
//   };
  
// function latlongrange(l,m){  
//   var R = 6378137; // Earth’s mean radius in meter
//   let origin = {lat: l, lng: m}
  
//   let latDist = R * rad(1)
//   let lngDist = R * rad(1) * Math.cos(rad(origin.lat))
  
//   console.log(latDist, lngDist);
  
//   let areaRadius = 1000; // in meters
  
//   let latitudeRangeDelta = areaRadius / latDist;
//   let longitudeRangeDelta = areaRadius / lngDist;
  
//   a = latitudeRangeDelta;
//   b = longitudeRangeDelta;
// }
//   // console.log('latitude of the area is within range [' + (origin.lat - latitudeRangeDelta) + ', ' + (origin.lat + latitudeRangeDelta) + ']')
//   // console.log('longitude of the area is within range [' + (origin.lng - longitudeRangeDelta) + ', ' + (origin.lng + longitudeRangeDelta) + ']')

//   //area range end
module.exports = router;