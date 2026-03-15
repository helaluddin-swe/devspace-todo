const Todo = require("../models/TodoModels");


// 1. Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const { task, date, priority, user } = req.body;
    
    const todoItem = new Todo({ 
      task, 
      date, 
      priority, 
      user 
    });

    await todoItem.save();
    res.status(201).json(todoItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get all Todos (Sorted by date)
exports.getTodoItems = async (req, res) => {
  try {
    const todoItems = await Todo.find().sort({ date: 1 });
    res.json(todoItems);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching todos" });
  }
};

// 3. Toggle Completion Status
exports.markedTodoItems = async (req, res) => {
  try {
    const { id } = req.params;
    const todoItem = await Todo.findById(id);

    if (!todoItem) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Toggle logic is better than just setting to 'true' 
    // so you can uncheck items if needed
    todoItem.completed = !todoItem.completed;
    
    await todoItem.save();
    res.json(todoItem);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID or update failed" });
  }
};

// 4. Delete a Todo
exports.deleteTodoItems = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Returning the deleted ID is helpful for frontend state management
    res.status(200).json({ message: "Deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};