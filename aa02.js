// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('data/m08.txt');

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
        console.log(allMeetings)

        // meetings.push(getMeetings(row))
        // fs.writeFileSync('data/address-test.json', JSON.stringify(allMeetings['streetAddress']));
        // console.log('*** *** *** *** ***');
    }
// return meetings
    
});



// get meetings (umbrella function)
function getMeetings (rawText) {
  
  // pull info for meeting metadata
  let metaData = getMetadata(rawText)
  let cleaned_Metadata = cleanMetadata(metaData)
  let newMetameeting = getAddress(cleaned_Metadata)
  // address accessibility
  // addres gray details box

  // pull info for meeting details
  let meetingData_Arr= cleanMeetingdata(getMeetingdata(rawText))
  let newMeetingdetails = getMeetingDetails(meetingData_Arr)

  // fill new meeting object with metadata and details
  let newAAmeeting = {}
  newAAmeeting = getAddress(cleaned_Metadata)
  newAAmeeting.meetingDetails = newMeetingdetails
  
  return newAAmeeting

  // push filled new meeting object to array holding all meetings
  // allMeetings = []
  // allMeetings.push(newAAmeeting)
  

}


// get metadata
function getMetadata (rawText) {
  var newMetadata = []
  newMetadata = (rawText).split('</td>')[0]
  return newMetadata
}


// clean metadata

function cleanMetadata (rawText) {
  var newMetadata = []
  newMetadata = (rawText).replaceAll('\t', '')
  return newMetadata
}


// get address + other metadata info

function getAddress (rawText) {
  var newAddress = {}
  newAddress.locationName = rawText.split(/>|</)[4]
  //console.log(rawText.split(/>|</))
  newAddress.meetingName = rawText.split(/>|</)[10]
  newAddress.streetAddress = rawText.split(/>|</)[14].split(/\t|\n/)[1].trim().replace(',', '')
  newAddress.crossStreet = rawText.split(/>|</)[16].trim().split(/\(|\)/)[1]
  newAddress.stateName = rawText.split(/>|</)[16].split(' ').at(-2)
  newAddress.zipCode = rawText.split(/>|</)[16].split(' ').at(-1).trim()

      if (newAddress.locationName === ('')){
        newAddress.locationName = "n/a"
      }
  
      if (rawText.includes('Wheelchair Access')){
        newAddress.accessibility = "Wheelchair Accessible"
      }else{
        newAddress.accessibility = "unknown"
      }

      if (rawText.includes('<div class="detailsBox">')){
        //newAddress.altDetails = rawText.split(/>|</)[24].trim()
        newAddress.altDetails = rawText.split('<div class="detailsBox">')[1].split(/\t|\n/)[1].trim().split('<br />')
      }else{
        newAddress.altDetails = "n/a"
      }
  return newAddress
}


// get meeting data as array

function getMeetingdata (rawText){
  var newMeetingdata = []
  newMeetingdata = rawText.split('</td>')[1].split('\t\t\t\t  \t    <b>')
  newMeetingdata = newMeetingdata.slice(1)
  return newMeetingdata
}

// clean meeting data

function cleanMeetingdata (array) {
  var newMeetingdata = []
  //newMeetingdata =
  for(let i=0; i<array.length; i++){
    newMeetingdata.push(
      array[i].replaceAll('\t', ' ')
      .replaceAll('<b>', '')
      .replaceAll('</b>', '')
      .replaceAll('<br />', '')
      .trim()
    )
  }
  return newMeetingdata
}


// convert to 24hr time

function get24hTime(rawText){
  var time = (rawText).split(":");
  if (time[0] === "12") time[0] = "00";
  if ((rawText).indexOf("PM") > -1) time[0] = parseInt(time[0])+12;
  return time.join(":");
}

// get Meeting Details

function getMeetingDetails (array) {
  let meetingDetails = []
  
  
  for(let i = 0; i < array.length; i++){
    let newMeeting = {}
    
    newMeeting.day = array[i].split(' ')[0]
    newMeeting.startTime = get24hTime(array[i].split(' ')[3].concat(' ' + array[i].split(' ')[4]))
    newMeeting.endTime = get24hTime(array[i].split(' ')[6].concat(' ' + array[i].split(' ')[7]))
    
    if (array[i].includes('Meeting Type')){
      newMeeting.meetingType = array[i].split(' ')[10].concat(' '+ array[i].split(' ')[11]).concat(' '+ array[i].split(' ')   [12]).concat(' '+ array[i].split(' ')[13])
      }else{
        newMeeting.meetingType = "n/a" 
      }
    if (array[i].includes('Special Interest')){
      newMeeting.specialInterest = array[i].split(' ')[16]
      }else{
        newMeeting.specialInterest = "n/a" 
      }
    //return newMeeting
    meetingDetails.push(newMeeting)
    }
return meetingDetails
}


// log trs
// function logTrs (tr) {
    //console.log(tr)
    // console.log('*************')
    // meetings.push(tr)
    // console.log(meetings.length)
    
// }