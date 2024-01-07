
const Page = require("./utils/page");

let page;

beforeEach(async () => {
  page = await Page.build({headless: "new"});
});

afterEach(async () => {
  await page.close();
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
  await page.login();
  await page.waitForSelector('a[href="/auth/logout"]');
  const logoutContent = await page.$eval('a[href="/auth/logout"]', el => el.innerText);

  expect(logoutContent).toEqual("Logout");
});
