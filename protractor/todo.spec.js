var todoPage = require('./TodoPage');
describe('react todo test', function () {
    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:5000');
    });

    it('should add todo´s and complete them', function () {
        todoPage.addTodo('Eat');
        todoPage.addTodo('Sleep');
        todoPage.addTodo('Play');
        todoPage.addTodo('Repeat');

        expect(todoPage.todoCount().getText()).toEqual('4 items left');
        expect(todoPage.getTodos().count()).toEqual(4);
        expect(todoPage.getTodos().get(0).getText()).toEqual('Eat');
        expect(todoPage.getTodos().get(1).getText()).toEqual('Sleep');
        expect(todoPage.getTodos().get(2).getText()).toEqual('Play');
        expect(todoPage.getTodos().get(3).getText()).toEqual('Repeat');

        todoPage.completeAllTodos();
        expect(todoPage.todoCount().getText()).toEqual('0 items left');

    });

});
