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

  describe("using valid inputs", () => {
    beforeEach(async () => {
      await page.type(".title input", "Some title");
      await page.type(".content input", "Some content");
      await page.click("button.teal");
    });

    test("should show expected confirmation window header", async () => {
      const header = await page.getContentBySelector("h5");

      expect(header).toEqual("Please confirm your entries");
    });

    test("should create a new blog", async () => {
      page.click(".green")

      await page.waitForSelector(".card");

      const title = await page.getContentBySelector(".card-title");
      const content = await page.getContentBySelector(".card-title+p");

      expect(title).toEqual("Some title");
      expect(content).toEqual("Some content");
    });
  });
});

describe("User is not logged in", () => {
  beforeAll(async () => {
    page = await Page.build({headless: "new"});
  });

  test("should not be able to create blog posts", async () => {
    const result = await page.evaluate(() => fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({title: "My Title", content: "My Content"}),
      }).then((res) => res.json())
    );

    expect(result).toEqual({error: "You must log in!"});
  });

  test("should not be able to get a list of posts", async () => {
    const result = await page.evaluate(() => fetch("/api/blogs").then((res) => res.json()));

    expect(result).toEqual({error: "You must log in!"});
  });
});