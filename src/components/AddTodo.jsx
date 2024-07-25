import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addTodo, updateTodo, toggleEditTodo} from '../features/todo/todoSlice'

function AddTodo() {

    const todos = useSelector(state => state.myTodo.todos);
    const edit = useSelector(state => state.myTodo.editTodo);

    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    
    const addTodoHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input))
        setInput("");
    }

  return (
    <>
        <div className='text-center font-extrabold text-4xl'>Todo</div>
        <form onSubmit={addTodoHandler} className="space-x-3 mt-5">
        <input
            type="text"
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter a Todo..."
            value={input}
            onChange={(e) => (edit ? (todos.foreach(todo => todo.isEditable ? setInput(todo.text) : setInput(e.target.value))) : setInput(e.target.value))}
        />
        <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
            {edit ? "Update Todo" : "Add Todo"}
        </button>
        </form>
    </>
  )
}

export default AddTodo
