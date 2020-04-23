const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://lovuey.github.io/lovue/#/');
  const author = await page.$$eval('div > .nickname', e=>e.map(value=>value.innerHTML ))
  console.log({author})
  await page.screenshot({path: 'lovue.png'});

  await browser.close();
})();
