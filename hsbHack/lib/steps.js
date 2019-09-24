// features/browser/steps.js
const { Before, After, Then, When } = require("cucumber");

Before(async function(scenario) {
  this.setScenarioName(scenario.pickle.name);
  await this.startPage();
});

After(async function() {
  await this.closePage();
  this.showDiffReport();
});

When("i go to {string}", async function(url) {
  await this.goto(url);
});

Then("i take screenshot {string}", async function(desc) {
  await this.screenshot(desc, "retirement-planning.main");
});

When("i type {string} in {string}", async function(text, selector) {
  await this.sendkeys(selector, text, false);
});

When("i click {string}", async function(selector) {
  await this.click(selector);
});

When("i press {string}", async function(command){
  await this.press(command);
})
