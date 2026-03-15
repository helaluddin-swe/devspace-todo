import React, { useContext } from "react";
import { useAppContext } from "../../context/AppContext";
import { addItemToServer } from "../../utils/helper";


const AddTodos = ({ onNewItem }) => {
  // Pull the backendUrl from your global context
  const { backendUrl } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const task = form.task.value;
    const date = form.date.value;
    const priority = form.priority.value;

    if (!task || !date) {
      alert("Please fill both Task and Date fields");
      return;
    }

    // Pass backendUrl to the service function
    const newItem = await addItemToServer(task, date, priority, backendUrl);

    if (newItem) {
      onNewItem(newItem);
      form.reset();
    } else {
      alert("Failed to add item. Check console for details.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="py-8 px-4 gap-3 justify-center items-end md:flex bg-white rounded-xl shadow-md border border-gray-100"
    >
      <div className="flex-1">
        <label className="block text-xs font-black text-blue-600 mb-1 ml-1 uppercase tracking-wider">Task Description</label>
        <input 
          type="text" 
          name="task" 
          maxLength={200}
          className="border-2 border-gray-200 w-full px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-0 outline-none transition-all" 
          placeholder="Ex: Finish the API documentation" 
        />
      </div>

      <div className="w-full md:w-48">
        <label className="block text-xs font-black text-blue-600 mb-1 ml-1 uppercase tracking-wider">Due Date</label>
        <input
          type="date"
          name="date"
          className="border-2 border-gray-200 w-full px-4 py-3 rounded-lg focus:border-blue-500 outline-none"
        />
      </div>

      <div className="w-full md:w-40">
        <label className="block text-xs font-black text-blue-600 mb-1 ml-1 uppercase tracking-wider">Priority</label>
        <select 
          name="priority" 
          defaultValue="medium"
          className="border-2 border-gray-200 w-full px-4 py-3 rounded-lg focus:border-blue-500 outline-none bg-white cursor-pointer"
        >
          <option value="low">Low 🟢</option>
          <option value="medium">Medium 🟡</option>
          <option value="high">High 🔴</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="bg-blue-600 w-full md:w-44 font-bold text-white h-[54px] hover:bg-blue-700 active:scale-95 transition-all rounded-lg mt-4 md:mt-0 shadow-lg shadow-blue-200"
      >
        ADD TODO
      </button>
    </form>
  );
};

export default AddTodos;