import { useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";

const initialState = [
    {
        id: new Date().getTime(),
        desc: 'Recolectar la piedra del alma',
        done: false
    },
    {
        id: new Date().getTime() * 3,
        desc: 'Recolectar la piedra del tiempo',
        done: false
    }
]

export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState)

    const handleNewTodo = (todo) => {
        console.log({todo});
    }

  return (
    <>
        <h1>ToDo App (10), <small>pendientes: 2</small></h1>
        <hr/>

        <div className="row">
            <div className="col-7">
                <TodoList todos={todos}></TodoList>
            </div>

            <div className="col-5">
                <h4>Agregar TODO</h4>
                <hr />

                <TodoAdd onNewTodo={handleNewTodo}></TodoAdd>
                {/* TodoAdd onNewTodo( todo ) */}
                {/* {id: newDate().., desc: '', done: false} */}
            </div>
        </div>

        
    </>
  )
}
