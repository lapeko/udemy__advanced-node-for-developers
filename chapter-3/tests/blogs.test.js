const Page = require("./utils/page");

let page;

describe("Blogs", () => {
  beforeEach(async () => {
    page = await Page.build({headless: "new"});
  });

  afterEach(async () => {
    await page.close();
  });

  it("should open blog creation form", async () => {
    await page.login();
    await page.click("a.btn-floating");
    const label = await page.getContentBySelector("form label");

    expect(label).toEqual("Blog Title");
  });
});