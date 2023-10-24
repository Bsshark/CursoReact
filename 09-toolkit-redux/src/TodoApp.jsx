import React, { useState } from 'react'
import { useGetTodoByIdQuery, useGetTodosQuery } from './store/apis'

export const TodoApp = () => {

  /* const {data: todos = [], isLoading, isFetching} = useGetTodosQuery(); */
  

 
  const [todoId, settodoId] = useState(1);
  const { data: todo, isLoading} = useGetTodoByIdQuery(todoId);

  const nextToDo = () => {
    settodoId(todoId + 1);
  }

  const prevToDo = () => {
    if(todoId != 1) {
      settodoId(todoId - 1);
    }
    
  }
  

  return (
    <>
        <h1>TODO - RTK Query</h1>
        <hr/>

        <h4>isLoading: {isLoading ? 'true' : 'false' }</h4>
        <pre>{JSON.stringify(todo)}</pre>



        {/* <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <strong>{todo.completed ? 'DONE' : 'PENDING'}</strong> <br />
              {todo.title}
              <hr />
            </li>
          ))}
        </ul> */}

        <button onClick={prevToDo}>
            Previous TODO
        </button>
        <button onClick={nextToDo}>
            Next TODO
        </button>
    </>
  )
}
