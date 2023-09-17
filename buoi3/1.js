request.get(url, {}, (error, resp, body) => {
  if (!error) {
    const users = JSON.parse(body)
    console.log(users[0]);
  }
})