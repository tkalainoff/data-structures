
// get addresses only (umbrella function)
function getAddresses (rawText) {
  
  // pull info for meeting metadata
  let metaData = getMetadata(rawText)
  let cleaned_Metadata = cleanMetadata(metaData)
  let newAddress = getAddressOnly(cleaned_Metadata)
  
  return newAddress
}

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
  newAddress.meetingName = rawText.split(/>|</)[10].split(' -')[0]
  // newAddress.streetAddress = rawText.split(/>|</)[14].split(/\t|\n/)[1].trim().replace(',', '')
  newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim()
  newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim())
  newAddress.roomName = rawText.split('<br>')[2].split(',')[1].trim()
  newAddress.crossStreet = rawText.split(/>|</)[16].trim().split(/\(|\)/)[1]
  newAddress.stateName = rawText.split(/>|</)[16].split(' ').at(-2)
  newAddress.zipCode = rawText.split(/>|</)[16].split(' ').at(-1).trim()

      if (newAddress.locationName === ('')){
        newAddress.locationName = "n/a"
      }

      if (newAddress.meetingName === ('ROOSEVELT ISLAND SERENITY')){
        newAddress.locationName = rawText.split('<br>')[2].split(',')[0].trim()
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[1].trim()
        newAddress.roomName = rawText.split('<br>')[2].split(',')[2].split(' ')[1]
        newAddress.zipCode = rawText.split('<br>')[2].split(',')[2].split(' ')[2]
      }

      if (newAddress.streetAddress.includes('- ')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].split('- ')[0].trim()
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].split('- ')[0].trim())
        newAddress.roomName = rawText.split('<br>')[2].split(',')[0].split('- ')[1].trim()
      }

      if (newAddress.streetAddress.includes(' (')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].split('(')[0].trim()
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].split('(')[0].trim())
        newAddress.roomName = rawText.split('<br>')[2].split(',')[0].split('(')[1].trim()
      }

      if (newAddress.streetAddress.includes('@')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().split('@')[0].trim()
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().split('@')[0].trim())
        newAddress.roomName = rawText.split('<br>')[2].split(',')[0].split('@')[1].trim()
      }

      if (newAddress.streetAddress.includes(' Rm ')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].split(' R')[0].trim()
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].split(' R')[0].trim())
        newAddress.roomName = rawText.split('<br>')[2].split(',')[0].split('t ')[1].trim()
      }

      if (newAddress.streetAddress.includes('337 E.')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].replace('337 E.', '337 E').trim()
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].replace('337 E.', '337 E').trim())
      }

      if (newAddress.streetAddress.includes('Tenth')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Tenth', '10th')
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('Tenth', '10th'))
      }

      if (newAddress.streetAddress.includes('Ninth')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Ninth', '9th')
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('Ninth', '9th'))
      }

      if (newAddress.streetAddress.includes('Fourth')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Fourth', '4th')
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('Fourth', '4th'))
      }

      if (newAddress.streetAddress.includes('Grammercy')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Grammercy', 'Gramercy')
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('Grammercy', 'Gramercy'))
      }

      if (newAddress.streetAddress.includes('Eastr')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Eastr', 'East')
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('Eastr', 'East'))
      }

      if (newAddress.streetAddress.includes('St.')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('St.', 'St')
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('St.', 'St'))
      }

      if (newAddress.streetAddress.includes('Street.')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].split('.')[0]
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].split('.')[0])
        newAddress.roomName = rawText.split('<br>')[2].split(',')[0].split('.')[1]
      }

      if (newAddress.streetAddress.includes('Blvd.')){
        newAddress.streetAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Blvd.', 'Blvd').trim()
        newAddress.streetAddressReformat = reformatAddresses(rawText.split('<br>')[2].split(',')[0].trim().replace('Blvd.', 'Blvd')).trim()
      }

      if (newAddress.roomName === ('')){
        newAddress.roomName = "n/a"
      }

      if (newAddress.stateName !== ('NY')){
        newAddress.stateName = "NY"
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

// get address only

function getAddressOnly (rawText) {
  var newAddress = rawText.split('<br>')[2].split(',')[0].trim()
    if (newAddress.includes('- ')){
      newAddress = rawText.split('<br>')[2].split(',')[0].split('- ')[0].trim()
    }

    if (newAddress.includes(' (')){
      newAddress = rawText.split('<br>')[2].split(',')[0].split('(')[0].trim()
    }

    if (newAddress.includes('W.')){
      newAddress = rawText.split('<br>')[2].split(',')[0].replace('.', '').trim()
    }

    if (newAddress.includes('337 E.')){
      newAddress = rawText.split('<br>')[2].split(',')[0].replace('337 E.', '337 E').trim()
    }

    if (newAddress.includes('Tenth')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Tenth', '10th')
    }

    if (newAddress.includes('Ninth')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Ninth', '9th')
    }

    if (newAddress.includes('Fourth')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Fourth', '4th')
    }

    if (newAddress.includes('Grammercy')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Grammercy', 'Gramercy')
    }

    if (newAddress.includes('Eastr')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('Eastr', 'East')
    }

    if (newAddress.includes('Street.')){
      newAddress = rawText.split('<br>')[2].split(',')[0].split('.')[0]
    }

    if (newAddress.includes('St.')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().replace('St.', 'St')
    }

    if (newAddress.includes(' Rm ')){
      newAddress = rawText.split('<br>')[2].split(',')[0].split(' R')[0].trim()
    }

    if (newAddress.includes('Blvd.')){
      newAddress = rawText.split('<br>')[2].split(',')[0].replace('Blvd.', 'Blvd')
    }

    if (newAddress.includes('@')){
      newAddress = rawText.split('<br>')[2].split(',')[0].trim().split('@')[0].trim()
    }

    if (newAddress === ('Church of the Good Shepard')){
      newAddress = rawText.split('<br>')[2].split(',')[1].trim()
    }
  var newAddress_reformat = reformatAddresses(newAddress)
  return newAddress_reformat
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

// function to reformat original addresses 
function reformatAddresses(rawText){
    var newString = (rawText).toUpperCase()
                    .replace('WEST', 'W')
                    .replace('EAST', 'E')
                    .replace('NORTH', 'N')
                    .replace('SOUTH', 'S')
                    .replace('STREET', 'ST')
    
    return newString
  }

// function to get unique addresses
function getUnique(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

module.exports = { getMetadata,
                cleanMetadata,
                getAddressOnly,
                getAddress,
                cleanMeetingdata, 
                getMeetingdata, 
                getMeetingDetails,
                reformatAddresses };

// NOT WORKING
// function to sort through quality of input address and latlongs 
// function getLatlongs (array) {
  
//   for(let i = 0; i < array.length; i++) {
//   let newLatlong = {}

//     if ((array)[i]["FeatureMatchingResultType"] !== "Success"){
//     matchIssues.push(newLatlong)
//     }
//     else {
//     newLatlong.address = (array)[i]["InputAddress"]["StreetAddress"]
//     newLatlong.latLong = [(array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], (array)[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]]
//     // console.log(newLatlong)
//     latLongs_final.push(newLatlong)
//     }
//   }
//   return latLongs_final
//   // return matchIssues
// }

// function to merge address with addresses and latlongs
// function mergeAddresses(array, arrMerg){
//   let mergedData = []
//   // let keys = Object.keys(mArr);
//   for (let i=0; i<array.length; i++){
//     for(let k=0; k<arrMerg.length; k++){
//       if (array[i] == arrMerg[k]['address'].split(' New York')[0]){
//       mergedData.push({'address':array[i], 'latLong': arrMerg[k]['latLong']});
//       }
//     }
//   }
//   console.log(mergedData)
// return mergedData
// }