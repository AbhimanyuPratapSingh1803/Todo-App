import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos : [],
    editTodo : false
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState: initialState,
    reducers : {
        addTodo : (state, action) => {
            const todo = {
                id : nanoid(),
                text : action.payload,
                complete : false,
                isEditable : false
            }
            state.todos.push(todo);
        },

        removeTodo : (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },

        updateTodo : (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? {...todo, text : action.payload.text} : todo))
        },

        updateisEditable : (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload ? {...todo, isEditable : true} : todo))
        },

        toggleComplete : (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload ? {...todo, complete : !todo.complete} : todo))
        },

        toggleEditTodo : (state, action) => {
            state.editTodo = !state.editTodo;
        }
    }
})

export const {addTodo, removeTodo, updateTodo, toggleComplete, toggleEditTodo, updateisEditable} = todoSlice.actions;

export default todoSlice.reducer;