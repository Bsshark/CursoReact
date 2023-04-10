import React, { useState } from 'react';
import { AddCategory } from './Components/AddCategory';

export const GifExpertApp = () => {

  const [categories, setCategories] = useState([ 'One Punch', 'Dragon Ball' ]);

  const onAddCategory = () => {
    setCategories(['Valorant', ...categories]);
  }

  return (
    <>
      {/* Título */ }
        <h1>GifExpertApp</h1>

        { /* Input */ }
        <AddCategory />

        { /* Tarjetas */ }
        <button onClick={onAddCategory}>Agregar</button>
        <ol>
          { categories.map( category => {
            return <li key={ category }>{category}</li>
          })}
        </ol>
          { /* GifItem */ }
    </>
  )
}
