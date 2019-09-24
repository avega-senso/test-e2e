Feature: TodoApp
    In order to do

    Scenario: I can add todos
        When i go to "http://localhost:5000"
        Then i take screenshot "Started"
        When i type "Eat" in ".new-todo"
        When i press "Enter"
        Then i take screenshot "First todo"
        When i add todo "Sleep"
        When i add todo "Play"
        When i add todo "Repeat"
        Then i take screenshot "Added all"

    Scenario: I can mark todos done and clear them
        When i go to "http://localhost:5000"
        When i add todo "Sleep"
        When i add todo "Play"
        When i add todo "Repeat"
        When i click ".todo-list li:nth-of-type(1) .toggle"
        When i click ".todo-list li:nth-of-type(3) .toggle"
        Then i take screenshot "First and third are checked"
        When i click ".clear-completed"
        Then i take screenshot "First and third are removed"
