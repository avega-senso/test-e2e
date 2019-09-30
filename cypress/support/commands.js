// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const newTodoSelector = '.new-todo';
const todoListSelector = '.todo-list';
const todoItemsSelector = '.todo-list li';

Cypress.Commands.add('createDefaultTodos', function() {
  let TODO_ITEM_ONE = 'buy some cheese';
  let TODO_ITEM_TWO = 'feed the cat';
  let TODO_ITEM_THREE = 'book a doctors appointment';

  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  let cmd = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps() {
      // we're creating our own custom message here
      // which will print out to our browsers console
      // whenever we click on this command
      return {
        'Inserted Todos': [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE]
      };
    }
  });

  // additionally we pass {log: false} to all of our
  // sub-commands so none of them will output to
  // our command log

  cy.get(newTodoSelector, { log: false }).type(`${TODO_ITEM_ONE}{enter}`, { log: false });
  cy.get(todoItemsSelector, { log: false }).should('have.length', 1);
  cy.get(newTodoSelector, { log: false }).type(`${TODO_ITEM_TWO}{enter}`, { log: false });
  cy.get(todoItemsSelector, { log: false }).should('have.length', 2);
  cy.get(newTodoSelector, { log: false }).type(`${TODO_ITEM_THREE}{enter}`, { log: false });
  cy.get(todoItemsSelector, { log: false }).should('have.length', 3);

  const combinedSelector = todoItemsSelector + ':visible';
  cy.get(combinedSelector, { log: false }).then(function($listItems) {
    // once we're done inserting each of the todos
    // above we want to return the .todo-list li's
    // to allow for further chaining and then
    // we want to snapshot the state of the DOM
    // and end the command so it goes from that
    // 'spinning blue state' to the 'finished state'
    cmd
      .set({ $el: $listItems })
      .snapshot()
      .end();
  });
});

Cypress.Commands.add('createTodo', function(todo) {
  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps() {
      return {
        'Inserted Todo': todo
      };
    }
  });

  // create the todo
  cy.get(newTodoSelector, { log: false }).type(`${todo}{enter}`, {
    log: false
  });

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  cy.get(todoListSelector, { log: false })
    .contains('li', todo.trim(), { log: false })
    .then(function($li) {
      // set the $el for the command so
      // it highlights when we hover over
      // our command
      cmd
        .set({ $el: $li })
        .snapshot()
        .end();
    });
});

Cypress.Commands.add('getByTestId', function(testId) {
  cy.get(`[data-test-id=${testId}]`);
});

Cypress.Commands.add('getTodoLabelByIndex', function(index) {
  cy.get(todoItemsSelector)
    .eq(index)
    .find('label');
});
