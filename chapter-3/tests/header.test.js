const puppeteer = require("puppeteer");


let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch(/*{headless: false}*/);
  page = (await browser.pages())[0];
  if (!page) page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

it("should have expected header", async () => {
  const text = await page.evaluate(() => document.querySelector("a.brand-logo").innerText);

  expect(text).toEqual("Blogster");
});

it("should visit auth page", async () => {
  const searchResultSelector = ".right a";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  const url = await page.url();

  expect(url).toMatch(/^https:\/\/accounts.google.com\//);
});
