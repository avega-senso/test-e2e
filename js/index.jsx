import React from "react";

import TodoApp from "./app.jsx";
import TodoModel from "./todoModel";

var model = new TodoModel("react-todos");

function render() {
  React.render(
    <TodoApp model={model} />,
    document.getElementsByClassName("todoapp")[0]
  );
}

model.subscribe(render);
render();
