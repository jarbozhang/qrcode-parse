const puppeteer = require('puppeteer');
const jsqr = require('jsqr');
const nodeFetch = require('node-fetch');
const PNG = require('pngjs').PNG;


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await nodeFetch('https://i.loli.net/2020/04/21/XAFucsbkLronES6.png').then(res => res.buffer()).then(buffer => {
    const image = PNG.sync.read(buffer)
    const data = new Uint8Array(image.data)
    console.log(jsqr(data, image.width, image.height).data)
  })
  /*, (error, response, body) => {
    const buffer = body.buffer()
    const image = new PNG({filterType:4}).parse(buffer, (error, data) => {console.log(data)})
  })*/
  await page.goto('http://zwdt.sh.gov.cn/smzy/fyz/qrcodeDetail?from=wx&type=1&ewmid=3SAhEgcPTazuyVMBPQIHNTZJnn2ekbJDbZM1GsAgKCPEL57qvHwMEfL1l4x5YXfK3ziD4DPgVg7eVupSb9hEZyBICAjBYQM79hCwzv2h1eI%3D&date=1587455142896');
  const color = await page.$eval('.qrcode__main__container__status-text', e=>e.innerHTML)
  console.log({color})
  const date = await page.$eval('.qrcode__main__container__date', e=>e.innerHTML)
  console.log({date})
  //await page.screenshot({path: 'example.png'});

  await browser.close();
})();
