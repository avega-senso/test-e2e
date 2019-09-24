
const { When } = require("cucumber");

When("i add todo {string}", async function(todo){
    await this.sendkeys(".new-todo", todo, false);
    await this.press("Enter");
})
