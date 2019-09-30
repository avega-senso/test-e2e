const selectors = {
  todoItems: '.todo-list li',
  count: 'span.todo-count',
  toggleAll: '.toggle-all',
  clearCompleted: '.clear-completed'
};

context('Todo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const todos = ['Eat', 'Sleep', 'Play', 'Repeat'];

  it("should add todo's and completet them", () => {
    todos.forEach((todo) => cy.createTodo(todo));

    cy.get(selectors.count).contains(`${todos.length} items left`);
    cy.get(selectors.todoItems).should('have.length', todos.length);

    cy.getTodoLabelByIndex(0).should('contain', 'Eat');
    cy.getTodoLabelByIndex(1).should('contain', 'Sleep');
    cy.getTodoLabelByIndex(2).should('contain', 'Spela');
    cy.getTodoLabelByIndex(3).should('contain', 'Repeat');

    cy.get(selectors.toggleAll).click();
    cy.get(selectors.count).contains('0 items left');
    cy.get(selectors.todoItems).should('have.length', 4);
    cy.get(selectors.clearCompleted).click();
    cy.get(selectors.todoItems).should('have.length', 0);
  });
});
