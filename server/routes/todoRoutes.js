const express = require("express");
const todoRouter = express.Router();
const todoController = require("../controllers/TodoControllers.js");

// Routes for the base path "/"
todoRouter.route("/")
  .get(todoController.getTodoItems)    // Get all todos
  .post(todoController.createTodo);    // Create a new todo

// Routes for specific IDs
todoRouter.patch("/:id/toggle", todoController.markedTodoItems); // Use PATCH for partial updates
todoRouter.delete("/:id", todoController.deleteTodoItems);       // Delete a todo

module.exports = todoRouter;