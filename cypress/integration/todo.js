const selectors = {
  todoItems: 'todo-item',
  count: 'todo-count',
  label: 'todo-label',
  toggleAll: 'toggle-all',
  clearCompleted: 'clear-completed'
};

context('Todo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("should add todo's and completet them", () => {
    cy.createTodo('Eat');
    cy.createTodo('Sleep');
    cy.createTodo('Play');
    cy.createTodo('Repeat');

    cy.getByTestId(selectors.count).contains(`4 items left`);
    cy.getByTestId(selectors.todoItems).should('have.length', 4);
    cy.getTodoLabelByIndex(0).should('contain', 'Eat');
    cy.getTodoLabelByIndex(1).should('contain', 'Sleep');
    cy.getTodoLabelByIndex(2).should('contain', 'Spela');
    cy.getTodoLabelByIndex(3).should('contain', 'Repeat');

    cy.getByTestId(selectors.toggleAll).click();

    cy.getByTestId(selectors.count).contains('0 items left');
    cy.getByTestId(selectors.todoItems).should('have.length', 4);

    cy.getByTestId(selectors.clearCompleted).click();

    cy.getByTestId(selectors.todoItems).should('have.length', 0);
  });
});
