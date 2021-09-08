const fs = require("fs").promises;

var htmlCached = '';

const loadHtml = async () => {
  if (!htmlCached) {
    htmlCached = await fs.readFile('static/index.html', 'utf-8');
  }
  return htmlCached;
}

module.exports.handler = async function(event, context){
  let html = await loadHtml();
  return {
    statusCode: 200,
    body: html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  };
}
