const express = require('express');
const router = express.Router();

router.get('/add', (req, res) => { //  /product/add
  res.send({ page: 'Add product' })
})

router.get('/update/:id', (req, res) => {  // /product/update/:id
  res.send({ page: 'Update product ' + req.params.id })
})

module.exports = router;