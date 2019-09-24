const puppeteer = require("puppeteer");
const { setWorldConstructor } = require("cucumber");

const { compare, setup } = require("./compare");
const createReport = require('./report')

class ImgDiffWorld {
  constructor(args) {
    setup();
    this.imgIndex = 0;
    this.diffs = [];
  }

  showDiffReport(){
    if(this.diffs.length){
      const summary = createReport(this.diffs);
      throw summary;
    }
  }

  async startPage() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async closePage() {
    await this.browser.close();
  }

  async setBasicAuth({ username, password }) {
    await this.page.authenticate({ username, password });
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.waitfor(selector);
    await this.page.click(selector);
  }

  async sendkeys(selector, keys, clear) {
    await this.waitfor(selector);
    if (clear) {
      await this.page.click(selector, {
        clickCount: 1
      });
      await this.page.keyboard.down("Control");
      await this.page.keyboard.press("A");
      await this.page.keyboard.up("Control");
      await this.page.keyboard.press("Backspace");
    }

    await this.page.type(selector, keys);
  }

  async press(command){
    await this.page.keyboard.press(command);
  }

  async screenshot(screenshotName) {
    await this.waitfor(1500);
    const filename = `${this.getFullTestName()}.${this
      .imgIndex++}.${screenshotName}.png`;
    const fullPath = `./hsbHack/current/${filename}`;

    await this.page.screenshot({
      path: fullPath,
      fullPage: true
    });
    const faultyPixels = await compare(filename).catch(err => {
      throw "comparator failed " + err;
    });
    if (faultyPixels > 0) {
      this.diffs.push({
        filename: filename,
        faultyPixels
      })

    }
  }

  setScenarioName(scenarioName) {
    this.scenarioName = scenarioName;
  }

  setTestName(testName) {
    this.testName = testName;
  }

  getFullTestName() {
    return (
      [this.scenarioName, this.testName].reduce(
        (fullName, name) => (fullName += name ? `-${this.testName}` : "")
      )
    );
  }

  async waitfor(selector) {
    await this.page.waitFor(selector, {
      timeout: 15000
    });
  }
}

setWorldConstructor(ImgDiffWorld);
