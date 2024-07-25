import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, toggleComplete, toggleEditTodo, updateisEditable } from '../features/todo/todoSlice';

const Todos = () => {
    const todos = useSelector(state => state.myTodo.todos);
    const dispatch = useDispatch();

    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const toggle = (id) => {
      dispatch(toggleComplete(id));
    };

    const toggleEdit = () => {
      dispatch(toggleEditTodo());
    };

    const updateEdit = (id) => {
      dispatch(updateisEditable(id));
    };

    const handleUpdateTodo = (id) => {
      dispatch(updateTodo({
        id,
        text: editingText,
      }));
      toggleEdit();
      setEditingTodoId(null);
      setEditingText("");
    };

    const handleEditButtonClick = (todo) => {
      setEditingTodoId(todo.id);
      setEditingText(todo.text);
      toggleEdit();
      updateEdit(todo.id);
    };


  return (
    <>
      <ul className="list-none">
        {todos?.map((todo) => (
          <li
            className={`mt-4 flex justify-between items-center shadow-lg shadow-zinc-800 px-4 py-2 rounded ${todo.complete ? "bg-green-500" : "bg-zinc-800"} `}
            key={todo.id}
          >
            <input
              type="checkbox"
              className='m-2'
              checked={todo.complete}
              onChange={() => toggle(todo.id)}
            />
            <div className={`text-white text-lg font-semibold ${todo.complete ? "line-through" : ""}`}>
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              ) : (
                todo.text
              )}
            </div>
            <div className='flex flex-row-reverse gap-x-3'>
              {editingTodoId === todo.id ? (
                <button
                  className='text-white inline-flex hover:cursor-pointer bg-green-600 border-0 py-1 px-4 focus:outline-none hover:bg-green-700 rounded text-md'
                  onClick={() => handleUpdateTodo(todo.id)}
                  // onKeyDown={(e) => e.enter}
                >
                  Save
                </button>
              ) : (
                <button
                  className='text-white inline-flex hover:cursor-pointer bg-indigo-600 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-700 rounded text-md'
                  onClick={() => handleEditButtonClick(todo)}
                >
                  {todo.complete ? "📁" : "✏️"}
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
