const Page = require("./utils/page");

let page;

describe("Blogs", () => {
  beforeAll(async () => {
    page = await Page.build({headless: "new"});
  });

  beforeEach(async () => {
    await page.login();
    await page.click("a.btn-floating");
  });

  afterAll(async () => {
    await page.close();
  });

  it("should open blog creation form", async () => {
    const label = await page.getContentBySelector("form label");

    expect(label).toEqual("Blog Title");
  });

  it("should show error message if invalid inputs", async () => {
    await page.click("form button");
    const titleError = await page.getContentBySelector(".title .red-text");
    const contentError = await page.getContentBySelector(".content .red-text");

    expect(titleError).toEqual("You must provide a value");
    expect(contentError).toEqual("You must provide a value");
  });
});