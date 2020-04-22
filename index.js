//const puppeteer = require('puppeteer');
const jsqr = require('jsqr');
const nodeFetch = require('node-fetch');
const Jimp = require('jimp');

const express = require("express");
const app = express();

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const url = await req.query.url && loadImage(req.query.url) || ''
  console.log({url})
  if(!req.query.url) {
    res.send("您可以直接把参数写到链接中例如：https://qrcode-parse.jarbozhang.now.sh/?url=https://i.loli.net/2020/04/21/XAFucsbkLronES6.png");
  } else {
    res.send(`对链接:${req.query.url}的解析结果为:${url}`)
  }
})

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is booming on port 5000
Visit http://localhost:5000`);
})


const loadImage = async (url) => {
  //const browser = await puppeteer.launch();
  //const page = await browser.newPage();
  const redirect = await nodeFetch(url)
  .then(res => res.buffer())
  .then(buffer => Jimp.read(buffer))
  .then(image => {
    const data = new Uint8Array(image.bitmap.data)
    return jsqr(data, image.bitmap.width, image.bitmap.height).data
  })
  /*await page.goto(redirect);
  try{
  const color = await page.$eval('.qrcode__main__container__status-text', e=>e.innerHTML)
  console.log({color})
  const date = await page.$eval('.qrcode__main__container__date', e=>e.innerHTML)
  console.log({date})
  } catch(e) {}
  await page.screenshot({path: 'example.png'});

  await browser.close();
  */
  return redirect
}
