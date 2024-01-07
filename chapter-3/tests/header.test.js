const puppeteer = require("puppeteer");
const {setupMongoose, destroyMongoose} = require("./utils/setup-mongoose");
const {getNewTestUser, destroyAllTestUsers} = require("./factories/user.factory");
const sessionFactory = require("./factories/session.factory");

let browser, page;

beforeAll(async () => {
  await setupMongoose();
});

beforeEach(async () => {
  browser = await puppeteer.launch(/*{headless: false}*/);
  page = (await browser.pages())[0];
  if (!page) page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

afterAll(async () => {
  await destroyMongoose();
  await destroyAllTestUsers();
});

it("should have expected header", async () => {
  const text = await page.$eval("a.brand-logo", el => el.innerText);

  expect(text).toEqual("Blogster");
});

it("should visit auth page", async () => {
  const searchResultSelector = ".right a";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  const url = await page.url();

  expect(url).toMatch(/^https:\/\/accounts.google.com\//);
});

it("Logout should be shown when logged in", async () => {
  const user = await getNewTestUser()
  const {session, sig} = sessionFactory(user);

  await page.setCookie({name: "session", value: session});
  await page.setCookie({name: "session.sig", value: sig});

  await page.goto("http://localhost:3000/blogs");

  await page.waitForSelector('a[href="/auth/logout"]');
  const logoutContent = await page.$eval('a[href="/auth/logout"]', el => el.innerText);

  expect(logoutContent).toEqual("Logout");
});
