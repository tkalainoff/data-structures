// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/first.json');

// load by using JSON.parse
var $ = JSON.parse(content);

// console.log($[0]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"])
console.log(getLatlongs($))

function getLatlongs (array) {
  var latLongs =[]
  var matchIssues = []

  for(let i = 0; i < array.length; i++) {
  let newLatlong = {}
  
  newLatlong.address = (array)[i]["InputAddress"]["StreetAddress"]
  newLatlong.latLong = [(array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], (array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]]
    
    if ((array)[i]["FeatureMatchingResultType"] !== "Success"){
    matchIssues.push(newLatlong)
    }
    else {
    latLongs.push(newLatlong)
    }
  }
  // return latLongs
  return matchIssues
}