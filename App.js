const express = require('express');
const API_URL = require('./common/constants');
const axios = require('axios');
const app = express();
let data = null;

app.listen(5000 ,async()=>{
  data = await getData();
  console.log(data);
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});

async function getData() {
  return new Promise((resolve, reject) => {
      return axios.get(API_URL).then(response => resolve(response.data)).catch(error => reject(error));
  });
}