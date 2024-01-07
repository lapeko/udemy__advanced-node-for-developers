const Puppeteer = require("puppeteer");
const {getNewTestUser} = require("../factories/user.factory");
const sessionFactory = require("../factories/session.factory");

class Page {
  static browser;

  static async build(options) {
    Page.browser = await Puppeteer.launch(options);
    const page = (await Page.browser.pages()[0]) || await Page.browser.newPage();
    await page.goto("http://localhost:3000");

    const pageProto = Object.getPrototypeOf(page);

    pageProto.login = async function () {
      const user = await getNewTestUser();
      const {session, sig} = sessionFactory(user);
      await this.setCookie({name: "session", value: session});
      await this.setCookie({name: "session.sig", value: sig});
      await this.goto("http://localhost:3000");
    };

    pageProto.close = async function () {
      await Page.browser.close();
    }

    return page;
  }
}

module.exports = Page;
