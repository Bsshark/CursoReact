import React from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = ({todos}) => {
  return (
    <ul className="list-group">
        {
            todos.map( todo => (
                <TodoItem
                    key={todo.id}
                    desc={todo.desc}
                    done={todo.done}
                ></TodoItem>
            ))
        }
        
    </ul>
  )
}
