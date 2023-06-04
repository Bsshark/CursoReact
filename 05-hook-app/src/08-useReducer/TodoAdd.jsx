import React from 'react'

export const TodoAdd = ({onNewTodo}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        onNewTodo({
            id: new Date().getTime(),
            desc: e.target[0].value,
            done: false
        });
    }

  return (
    <form onSubmit={onSubmit}>
        <input  type="text" placeholder="¿Qué hay que hacer" className="form-control"/>
        <button type="submit" className="btn btn-outline-primary mt-1">Agregar</button>
    </form>
  )
}
