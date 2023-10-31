module.exports = {
  errResponse(code, message, res) {
    return res.json({
      code,
      data: null,
      message
    });
  }
}