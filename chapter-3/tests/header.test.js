const puppeteer = require("puppeteer");

it("Check sum of 2 and 2", () => {
  expect(2 + 2).toBe(4);
});

it("run a browser", async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
});