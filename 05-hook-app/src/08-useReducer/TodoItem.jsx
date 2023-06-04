import React from 'react'

export const TodoItem = ({id, desc, done}) => {
  return (
    <li key={id} className="list-group-item d-flex justify-content-between">
        <span className="align-self-center">{desc}</span>
        <button className="btn btn-danger">Borrar</button>
    </li>
  )
}
