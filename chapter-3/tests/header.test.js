
const Page = require("./utils/page");

let page;

beforeEach(async () => {
  page = await Page.build({headless: "new"});
});

afterEach(async () => {
  await page.close();
});

it("should have expected header", async () => {
  const text = await page.getContentBySelector("a.brand-logo");

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
  const logoutContent = await page.getContentBySelector('a[href="/auth/logout"]');

  expect(logoutContent).toEqual("Logout");
});
