const express = require('express');
const bodyParser = require('body-parser');
const API_URL = require('./common/constants');
const axios = require('axios');
const _ = require('lodash');
const app = express();
let openData = null;
/* Parsing body because we can't pass value to the front */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Setting port that we are going to listen */
app.listen(5000, async () => {
  openData = await getData();
  console.log('Done, we have connection');
}).on('error', (e) => {
  console.log('Error happened: ', e.message)
});

/* CORS permissions */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

/* Filtering data by passed COUNTRY */
app.post('/', (req, res) => {
  const { country } = req.body /* <=======================    Don't forget to delete*/
  if (!country) {
    return res.send('Pleas provide country');
  }
  const filtredData = _.filter(openData, item => item.country === country);
  console.log(filtredData);  /* <=======================    Don't forget to delete*/
  return res.send(filtredData);
});

/*It's alot o f data,for that we use async. We don't need to wait while it will be loaded and our web will be locked. */
async function getData() {
  return new Promise((resolve, reject) => {
    return axios.get(API_URL).then(response => resolve(response.data)).catch(error => reject(error));
  });
}