// tinh phep tinh sau bang API đã tạo ở bài 1 (((3+5) + (2+4))*6)/2
// request, Promise, async/await

// (3+5)  => x = 8 // http://localhost:3000/cong/3/5
// (2+4)  => y = 6 // http://localhost:3000/cong/2/4
// x + y  => t = 8 + 6 // http://localhost:3000/cong/8/6
// t * 6  => z = 14 * 6 // http://localhost:3000/nhan/14/6
// z / 2  => r = 84 / 2 // http://localhost:3000/chia/84/2   => 42


const Request = require('../buoi3/Helper');

const url = 'http://localhost:3000';
const a = 3, b = 5, c = 2, d = 4, e = 6, f = 2;
(async () => {
  const tong1 = await Request.requestGet(`${url}/cong/${a}/${b}`);
  const x = tong1.ketqua;

  const tong2 = await Request.requestGet(`${url}/cong/${c}/${d}`);
  const y = tong2.ketqua;

  const tong3 = await Request.requestGet(`${url}/cong/${x}/${y}`);
  const t = tong3.ketqua;

  const tich = await Request.requestGet(`${url}/nhan/${t}/${e}`);
  const z = tich.ketqua;

  const thuong = await Request.requestGet(`${url}/chia/${z}/${f}`);
  const r = thuong.ketqua;
  console.log(x, y, t, z, r);
})();