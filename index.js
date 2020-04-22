const puppeteer = require('puppeteer');
const jsqr = require('jsqr');
const nodeFetch = require('node-fetch');
const Jimp = require('jimp');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = await nodeFetch('https://i.loli.net/2020/04/21/XAFucsbkLronES6.png')
  .then(res => res.buffer())
  .then(buffer => Jimp.read(buffer))
  .then(image => {
    const data = new Uint8Array(image.bitmap.data)
    return jsqr(data, image.bitmap.width, image.bitmap.height).data
  })
  console.log(url)
  /*await page.goto(url);
  const color = await page.$eval('.qrcode__main__container__status-text', e=>e.innerHTML)
  console.log({color})
  const date = await page.$eval('.qrcode__main__container__date', e=>e.innerHTML)
  console.log({date})*/
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
