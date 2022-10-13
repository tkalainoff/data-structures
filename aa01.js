// npm install axios
// mkdir data

const fs = require('fs');

const axios = require('axios');

axios
  .get('https://parsons.nyc/aa/m10.html')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    fs.writeFileSync('/home/ec2-user/environment/m10.txt', res.data);
  })
  .catch(error => {
    console.error(error);
  });
  
  