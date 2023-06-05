import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useTodo } from "../hooks/useTodo";



export const TodoApp = () => {

    //useTodo
    // todos, handlers

    const {todos, todosCount, pendingTodosCount, handleNewTodo, handleDelTodo, handleToggleTodo} = useTodo();

  return (
    <>
        <h1>ToDo App ({todosCount}), <small>pendientes: {pendingTodosCount}</small></h1>
        <hr/>

        <div className="row">
            <div className="col-7">
                <TodoList 
                    todos={todos} 
                    onDeleteTodo={handleDelTodo}
                    onToggleToDo={ handleToggleTodo }
                ></TodoList>
            </div>

            <div className="col-5">
                <h4>Agregar TODO</h4>
                <hr />

                <TodoAdd 
                    onNewTodo={handleNewTodo}
                ></TodoAdd>
                {/* TodoAdd onNewTodo( todo ) */}
                {/* {id: newDate().., desc: '', done: false} */}
            </div>
        </div>

        
    </>
  )
}
