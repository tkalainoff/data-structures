// npm install cheerio
// npm install n_

var fs = require('fs');
var _ = require('lodash');
var cheerio = require('cheerio');
const { listenerCount } = require('process');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/geocodes08-test.json');
var content2 = fs.readFileSync('data/meetings08-test.json');


// load by using JSON.parse
var $ = JSON.parse(content);
var $2 = JSON.parse(content2);
console.log('Geocodes Array is length:', $.length)
console.log($2)
console.log('Meetings Array is length:', $2.length)

// call function to get lats and longs from the geocode output
let latLongs = getLatlongs($)
console.log(latLongs)
console.log(latLongs.length)

// call function to merge original array of addresses to the array of objects with addresses and latLongs
// let merge = mergeAddresses(latLongs, $2)
// console.log(merge)
// console.log('Merged Array is length:', merge.length) 

// function to get input address and latlongs from the geocode output Json
function getLatlongs (array) {

  let latLongs = []

  for(let i = 0; i < array.length; i++) {
  let newLatlong = {}
    newLatlong.address = (array)[i]["InputAddress"]["StreetAddress"].split(' New York')[0]
    newLatlong.latLong = [(array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], (array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]]
    // console.log(newLatlong)
  latLongs.push(newLatlong)
  }
  return latLongs
}

let resultArr = [];
$2.forEach((m)=>{
    latLongs.forEach((l)=>{
      if(l.address == m.streetAddressReformat){
        resultArr.push({...m, ...l})
      }
    })
})
console.log(resultArr)
console.log(resultArr.length)

let mapped = latLongs.reduce

// function to merge meetings with addresses and latlongs
// function mergeAddresses(array, arrMerg){
//   // let mergedData = []
//   // let keys = Object.keys(mArr);
//   for (let i=0; i<array.length; i++){
//     for(let k=0; k<arrMerg.length; k++){
//       if (array[i]['streetAddressReformat'] == arrMerg[k]['address']){
//       mergedData.push({'address':array[i], 'latLong': arrMerg[k]['latLong']});
//       }
//     }
//   }
//   console.log(mergedData)
// return mergedData
// }




// it did NOT like it when I tried to put this function in a new variable....
  // var combinedData = mergeAddresses((addressesReformatted, latLongs))
  // console.log(combinedData)

// checking data extraction values
  // console.log($[0]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"])
  // console.log(latLongs[0]['address'].split(' New York')[0])
  console.log($2[0]['streetAddressReformat'])

