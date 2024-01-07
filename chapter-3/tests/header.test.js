const puppeteer = require("puppeteer");
const Keygrip = require("keygrip");
const cookieKey = require("../config/keys").cookieKey;

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({headless: false});
  page = (await browser.pages())[0];
  if (!page) page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  // await browser.close();
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

it.only("Bla bla", async () => {
  const id = "65988b48c12389babc91994e";
  const sessionObject = {passport: {user: id}};
  const sessionString = btoa(JSON.stringify(sessionObject));
  const keygrip = Keygrip([cookieKey]);
  const sig = keygrip.sign("session=" + sessionString);

  await page.setCookie({name: "session", value: sessionString});
  await page.setCookie({name: "session.sig", value: sig});

  await page.goto("http://localhost:3000/blogs");
});
