const puppeteer = require("puppeteer");

describe("Header", () => {
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

  it("run a browser", async () => {
    console.log({browser, page});
    const text = await page.evaluate(() => document.querySelector("a.brand-logo").innerText);

    expect(text).toEqual("Blogster");
  });
});
