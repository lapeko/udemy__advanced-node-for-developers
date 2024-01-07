const puppeteer = require("puppeteer");

it("Check sum of 2 and 2", () => {
  expect(2 + 2).toBe(4);
});

it("run a browser", async () => {
  const browser = await puppeteer.launch(/*{headless: false}*/);
  let page = (await browser.pages())[0];
  if (!page) page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const text = await page.evaluate(() => document.querySelector("a.brand-logo").innerText);

  expect(text).toEqual("Blogster");

  await browser.close();
});