const express = require('express');
const API_URL = require('./common/constants');
const axios = require('axios');
const _ = require('lodash');
const app = express();
let openData = null;

// Setting port that we are going to listen
app.listen(5000 ,async()=>{
  openData = await getData();
  console.log('Done, we have connection');
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});

//Filtering data by passed COUNTRY
app.get('/', (req, res) => {
  const filtredData = _.filter(openData, item => item.country === 'Lithuania');
  console.log(filtredData);
});

async function getData() {
  return new Promise((resolve, reject) => {
      return axios.get(API_URL).then(response => resolve(response.data)).catch(error => reject(error));
  });
}