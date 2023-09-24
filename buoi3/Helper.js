const request = require('request');

class Request {
  requestGet = (url) => {
    return new Promise((resolve, reject) => {
      request.get(url, {}, (error, resp, body) => {
        return resolve(JSON.parse(body));
      })
    })
  }

  requestPost = () => { }
}

module.exports = new Request(); // class Request
