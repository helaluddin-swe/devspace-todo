const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: { 
      type: String, 
      required: [true, "Task description is required"],
      trim: true,
      maxlength: [200, "Task cannot exceed 200 characters"]
    },
    date: { 
      type: Date, 
      required: [true, "Due date is required"],
      default: Date.now 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    // Useful if you add authentication later
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false 
    }
  },
  { 
    timestamps: true,
    // Ensures virtuals are included when converting to JSON (good for APIs)
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Example: Check if a task is overdue
TodoSchema.virtual("isOverdue").get(function() {
  return !this.completed && this.date < new Date();
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;