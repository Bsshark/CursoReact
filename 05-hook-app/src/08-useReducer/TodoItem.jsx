export const TodoItem = ({todo, onDeleteTodo, onToggleToDo}) => {


  return (
    <li key={todo.id} className="list-group-item d-flex justify-content-between">
        <span 
          className={`align-self-center ${todo.done ? 'text-decoration-line-through' : ''}`}
          onClick={() => onToggleToDo(todo.id)}
          aria-label='span-li'
          >{todo.desc}</span>
        <button className="btn btn-danger" onClick={() => onDeleteTodo(todo.id)}>Borrar</button>
    </li>
  )
}
