import React, { useEffect, useReducer, useState } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos') || []); //Si es nulo regresa vacío
}

export const useTodo = () => {
  
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) );
      }, [todos]);


    const handleNewTodo = (todo) => {
        const action = {
            type: 'Add ToDo',
            payload: todo
        }

        dispatch(action);
    }

    const handleDelTodo = (id) => {
       
        dispatch({
            type: 'Del ToDo',
            payload: id
        });

       
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: 'Toggle ToDo',
            payload: id
        })
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDelTodo,
        handleToggleTodo
    }
}
