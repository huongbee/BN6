const request = require('request');

class Request {
  requestGet = (url) => {
    return new Promise((resolve, reject) => {
      request.get(url, {}, (error, resp, body) => {
        if (!error) {
          if (resp.statusCode == 200)
            return resolve(JSON.parse(body)); // lay data tu api bang resolve
          else
            return reject('Couldn\'t find data');
        }
        return reject('Server error!');
      })
    })
  }

  requestPost = () => { }
}

module.exports = new Request(); // class Request