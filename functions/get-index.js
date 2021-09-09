const fs = require("fs").promises;
const Mustache = require('mustache');
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const superagent = require('superagent');

const restaurantsApiRoot = process.env.restaurant_api;


var htmlCached = '';
const loadHtml = async () => {
  if (!htmlCached) {
    htmlCached = await fs.readFile('static/index.html', 'utf-8');
  }
  return htmlCached;
}

const getRestaurants = async() => (await superagent.get(restaurantsApiRoot)).body;

module.exports.handler = async function(event, context){
  let template = await loadHtml();
  let restaurants = await getRestaurants();
  const dayOfWeek = days[new Date().getDay()];
  let html = Mustache.render(template, {dayOfWeek, restaurants});

  return {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  };
}
