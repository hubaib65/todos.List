#!/usr/bin/env node

import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
  let action = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "Choose an action:",
      choices: [
        { name: "Add Todo", value: "add" },
        { name: "View Todos", value: "view" },
        { name: "Update Todo", value: "update" },
        { name: "Delete Todo", value: "delete" },
        { name: "Quit", value: "quit" },
      ],
    },
  ]);

  switch (action.action) {
    case "add":
      let addmore = true;
      while(addmore){  
      let addtask = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: "What you want to add in your todos?: ",
        },
        {
          name: "addmore",
          type: "confirm",
          message: "Do you want to add more?: ",
          default: false,
        },
      ]);
     if(addtask.todo !=="") {
        todos.push(addtask.todo);} 
        else{console.log("please enter a valid todo");
        }
        addmore = addtask.addmore;
    }
      break;
    case "view":
      if (todos.length === 0) {
        console.log("No todos to view.");
      } else {
        for (let i = 0; i < todos.length; i++) {
          console.log(`${i + 1}. ${todos[i]}`);
        }
      }
      break;
    case "update":
      if (todos.length === 0) {
        console.log("No todos to update.");
      } else {
        let updatetodo = await inquirer.prompt([
          {
            name: "index",
            type: "number",
            message: "Enter the index of the todo to update: ",
          },
          {
            name: "newtodo",
            type: "input",
            message: "Enter the new todo: ",
          },
        ]);
        if (updatetodo.index >= 0 && updatetodo.index < todos.length) {
          todos[updatetodo.index] = updatetodo.newtodo;
        } else {
          console.log("Invalid index.");
        }
      }
      break;
    case "delete":
      if (todos.length === 0) {
        console.log("No todos to delete.");
      } else {
        let deletetodo = await inquirer.prompt([
          {
            name: "index",
            type: "number",
            message: "Enter the index of the todo to delete: ",
          },
        ]);
        if (deletetodo.index >= 0 && deletetodo.index < todos.length) {
          todos.splice(deletetodo.index, 1);
        } else {
          console.log("Invalid index.");
        }
      }
      break;
    case "quit":
      condition = false;
      break;
  }
}

console.log(todos);