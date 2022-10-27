// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');
const { listenerCount } = require('process');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/firstA.json');

// load by using JSON.parse
var $ = JSON.parse(content);

// call function to get lats and longs from the geocode output
let latLongs = getLatlongs($)
// console.log(latLongs.length)

// call function to reformat original array of addresses to match the formatting from the geocode output
let addresses = ['109 West 129th Street', '240 West 145th Street', '469 West 142nd Street','240 West 145th Street','109 West 129th Street', '109 West 129th Street']
let addressesReformatted = reformatAddresses(addresses)
// console.log(reformatAddresses(addresses))

// call function to merge original array of addresses to the array of objects with addresses and latLongs
console.log(mergeAddresses(addressesReformatted, latLongs))

// it did NOT like it when I tried to put this function in a new variable....
  // var combinedData = mergeAddresses((addressesReformatted, latLongs))
  // console.log(combinedData)

// checking data extraction values
  // console.log($[0]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"])
  // console.log(latLongs[0]['address'].split(' New York')[0])
  // console.log(addressesAllcaps[0])



// function to get input address and latlongs from the geocode output Json
function getLatlongs (array) {
  // var matchIssues = [];
  var latLongs =[];
  
  for(let i = 0; i < array.length; i++) {
  let newLatlong = {}
  
  newLatlong.address = (array)[i]["InputAddress"]["StreetAddress"]
  newLatlong.latLong = [(array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], (array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]]
    
  latLongs.push(newLatlong)

    // if ((array)[i]["FeatureMatchingResultType"] !== "Success"){
    // matchIssues.push(newLatlong)
    // }
    // else {
    // latLongs.push(newLatlong)
    // }
  }
  return latLongs
  // return matchIssues
}

// function to merge address with addresses and latlongs
function mergeAddresses(array, arrMerg){
  let mergedData = []
  // let keys = Object.keys(mArr);
  for (let i=0; i<array.length; i++){
    for(let k=0; k<arrMerg.length; k++){
      if (array[i] == arrMerg[k]['address'].split(' New York')[0]){
      mergedData.push({'address':array[i], 'latLong': arrMerg[k]['latLong']});
      }
    }
  }
  // console.log(mergedData)
return mergedData
}


// function to reformat original addresses 
function reformatAddresses(array){
  let newStrings = []

  for(let i = 0; i < array.length; i++) {
    newString = (array)[i].toUpperCase().replace('WEST', 'W').replace('STREET', 'ST')

    newStrings.push(newString)
  }
  return newStrings
}