const express = require('express');
const app = express();


app.get('/:phep_tinh/:so_a/:so_b', (req, res) => {
  let { phep_tinh, so_a, so_b } = req.params;
  const a = +so_a;
  const b = +so_b;
  let ketqua = null;

  if (!Number.isInteger(a) || isNaN(b)) {
    return res.json({
      error: true,
      message: 'URL number!'
    })
  }
  switch (phep_tinh) {
    case 'cong':
      // ketqua = a + b;
      phep_tinh = '+'
      break;
    case 'tru':
      // ketqua = a - b;
      phep_tinh = '-'
      break;
    case 'nhan':
      // ketqua = a * b;
      phep_tinh = '*'
      break;
    case 'chia':
      if (b == 0) {
        return res.json({
          error: true,
          message: 'Math error!'
        });
      }
      phep_tinh = '/'
      // ketqua = Math.round((a / b) * 100) / 100;  /// Math.round(33.333) = 33 / 100 = 0.33
      break;
    default:
      return res.json({
        error: true,
        message: 'URL invalid!'
      })
  }
  // a + b
  const ketquaString = `${a}${phep_tinh}${b}`;
  ketqua = eval(ketquaString); //eval()
  return res.json({
    pheptinh: phep_tinh,
    a,
    b,
    ketqua: ketqua,
  });
})

app.listen(3000, () => console.log('Server listening on port 3000'));