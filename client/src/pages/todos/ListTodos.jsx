

import { useState, useContext } from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";


const ListTodos = () => {
  const { backendUrl } =useAppContext()
  const [filterByStatus, setFilterByStatus] = useState("all");
  const [filterByDateRange, setFilterByDateRange] = useState("all");
  const [filterByExactDate, setFilterByExactDate] = useState("");
  const {todoItems,setTodoItems}=useAppContext()

  // ✅ 1. API Handlers
  const handleToggleComplete = async (id) => {
    try {
      // Endpoint matches your router: PATCH /api/todos/:id/toggle
      const response = await axios.patch(`${backendUrl}/api/todos/${id}/toggle`);
      if (response.data) {
        setTodoItems((prev) =>
          prev.map((item) => (item._id === id ? response.data : item))
        );
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${backendUrl}/api/todos/${id}`);
      setTodoItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // ✅ 2. Helper Functions (Standardizing field names to 'date' per your schema)
  const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

  const isThisWeek = (date) => {
    const now = new Date();
    const start = new Date(now.setDate(now.getDate() - now.getDay()));
    const end = new Date(now.setDate(now.getDate() + 6));
    return date >= start && date <= end;
  };

  const isOverdue = (due) => new Date(due) < new Date() && !isSameDay(new Date(due), new Date());

  // ✅ 3. Filter Logic
  const filteredItems = todoItems.filter((item) => {
    const due = new Date(item.date); // Using 'date' from your schema

    if (filterByStatus === "completed" && !item.completed) return false;
    if (filterByStatus === "incomplete" && item.completed) return false;

    if (filterByDateRange === "today" && !isSameDay(due, new Date())) return false;
    if (filterByDateRange === "thisWeek" && !isThisWeek(due)) return false;
    if (filterByDateRange === "upcoming" && isOverdue(due)) return false;
    if (filterByDateRange === "overdue" && (!isOverdue(due) || item.completed)) return false;

    if (filterByExactDate && !isSameDay(due, new Date(filterByExactDate))) return false;

    return true;
  });

  const incompleteItems = filteredItems.filter((item) => !item.completed);
  const completedItems = filteredItems.filter((item) => item.completed);

  return (
    <div className="mt-4 space-y-4 px-4 py-4 mb-4 min-h-screen">
      {/* 🎛 Filter Controls */}
      <div className="flex flex-col md:flex-row px-4 md:px-8 m-4 gap-4 mb-6 bg-blue-600 text-white py-4 rounded-xl justify-between shadow-lg">
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase mb-1">Status</label>
          <select
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 outline-none"
          >
            <option value="all">All Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase mb-1">Timeframe</label>
          <select
            value={filterByDateRange}
            onChange={(e) => setFilterByDateRange(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="upcoming">Upcoming</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase mb-1">Specific Date</label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filterByExactDate}
              onChange={(e) => setFilterByExactDate(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white text-gray-800 outline-none"
            />
            {filterByExactDate && (
              <button onClick={() => setFilterByExactDate("")} className="text-white underline text-sm">Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* 🧾 Incomplete Tasks */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📌 Pending Tasks <span className="bg-blue-100 text-blue-600 text-sm px-2 py-0.5 rounded-full">{incompleteItems.length}</span>
        </h2>
        <div className="space-y-3">
          {incompleteItems.map((item) => (
            <TodoCard 
              key={item._id} 
              item={item} 
              onToggle={() => handleToggleComplete(item._id)} 
              onDelete={() => handleDelete(item._id)} 
            />
          ))}
          {incompleteItems.length === 0 && <p className="text-gray-400 italic text-center py-4">No pending tasks found.</p>}
        </div>
      </section>

      {/* ✅ Completed Tasks */}
      {completedItems.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-500 mb-4">Done</h2>
          <div className="space-y-3 opacity-70">
            {completedItems.map((item) => (
              <TodoCard 
                key={item._id} 
                item={item} 
                onToggle={() => handleToggleComplete(item._id)} 
                onDelete={() => handleDelete(item._id)} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// Sub-component for better readability
const TodoCard = ({ item, onToggle, onDelete }) => {
  const priorityColors = {
    high: "border-l-red-500",
    medium: "border-l-yellow-500",
    low: "border-l-green-500"
  };

  return (
    <div className={`flex items-center justify-between border border-l-4 ${priorityColors[item.priority] || 'border-l-gray-300'} px-5 py-4 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={onToggle}
          className="w-6 h-6 rounded-full border-gray-300 text-blue-600 cursor-pointer"
        />
        <div>
          <h3 className={`text-lg font-semibold ${item.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
            {item.task}
          </h3>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">
            Due: {new Date(item.date).toLocaleDateString()} • Priority: {item.priority}
          </p>
        </div>
      </div>
      <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
        <Trash size={20} />
      </button>
    </div>
  );
};



export default ListTodos
