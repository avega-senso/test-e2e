var TodoPage = function () {
    var todoField = element.all(by.className('new-todo'));
    var todos = element.all(by.className('todo-list')).all(by.tagName('li'));
    var complete = element.all(by.css('.toggle'));
    var todoCount = element(by.css('.todo-count'));

    this.addTodo = function (todo) {
        todoField.sendKeys(todo, protractor.Key.ENTER);
    };

    this.getTodos = function () {
        return todos;
    };

    this.todoCount = function () {
        return todoCount;
    };

    this.completeAllTodos = function () {
        complete.each(function (element) {
            element.click();
        })
    }
};
module.exports = new TodoPage();
