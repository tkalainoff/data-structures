// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');
var _ = require('lodash')

// load helper function library
var helper = require('./aa_helpers');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/mAll.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// global array for meeting info
var meetings = [];

// get trs
$('tr').each(function(i, elem) {
    // loop through trs
    if ($(elem).attr("style")=="margin-bottom:10px") {
        let row = $(elem).html();
// run my function
        let allMeetings = getMeetings(row); 
        // console.log(allMeetings)
        meetings.push(allMeetings)
      }
return meetings
    
});

// console.log(meetings[42])
console.log(meetings)
// // console.log(meetings[0]['meetingDetails'])
console.log(meetings.length)
// fs.writeFileSync('data/meetingsAll-test.json', JSON.stringify(meetings));
console.log('*** *** *** *** ***');

// global array for streetAddress info
var addresses = [];


// get trs
$('tr').each(function(i, elem) {
    // loop through trs
    if ($(elem).attr("style")=="margin-bottom:10px") {
        let row = $(elem).html();
// run my function
        let allAddresses = getAddresses(row); 
        // console.log(allAddresses)
        addresses.push(allAddresses)
      }
return addresses
    
});

var uniq_addresses = _.uniq(addresses);

console.log(addresses[42])
console.log(addresses.length)
console.log(uniq_addresses)
console.log(uniq_addresses.length)
// fs.writeFileSync('data/addressesAll-test.json', JSON.stringify(addresses));
console.log('*** *** *** *** ***');

// get addresses only (umbrella function)
function getAddresses (rawText) {
  
  // pull info for meeting metadata
  let metaData = helper.getMetadata(rawText)
  let cleaned_Metadata = helper.cleanMetadata(metaData)
  let newAddress = helper.getAddressOnly(cleaned_Metadata)
  
  return newAddress
}

// get meetings (umbrella function)
function getMeetings (rawText) {
  
  // pull info for meeting metadata
  let metaData = helper.getMetadata(rawText)
  let cleaned_Metadata = helper.cleanMetadata(metaData)
  let newMetameeting = helper.getAddress(cleaned_Metadata)
  // address accessibility
  // addres gray details box

  // pull info for meeting details
  let meetingData_Arr= helper.cleanMeetingdata(helper.getMeetingdata(rawText))
  let newMeetingdetails = helper.getMeetingDetails(meetingData_Arr)

  // fill new meeting object with metadata and details
  let newAAmeeting = {}
  newAAmeeting = helper.getAddress(cleaned_Metadata)
  newAAmeeting.meetingDetails = newMeetingdetails
  
  return newAAmeeting
}

