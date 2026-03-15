import React from 'react';
import AddTodos from './AddTodos';
import ListTodos from './ListTodos';

const TodoPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <AddTodos />
      </section>
      
      <hr className="border-slate-800" />
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Your Task List</h2>
        <ListTodos />
      </section>
    </div>
  );
};

export default TodoPage;