import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../helpers';

export const HeroPage = () => {

  const {id} = useParams();

  const hero = getHeroById(id);

  const navigate = useNavigate();

  const onReturn = () => {
    navigate(-1);
  }

  if ( !hero ) {
    return <Navigate to="/marvel"></Navigate>
  }

  return (
    <div className='row mt-5'>
      <div className="col-4">
        <img 
        src={`/assets/heroes/${id}.jpg`} 
        alt={hero.superhero}
        className='img-thumbnail' />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><b>Alter ego:</b> { hero.alter_ego }</li>
          <li className='list-group-item'><b>Publisher:</b> {hero.publisher} </li>
          <li className='list-group-item'><b>First appareance:</b> {hero.first_appearance} </li>
        </ul>

        <h5 className='mt-3'>
          Characters
        </h5>
        <p className='mt-1'>
          {hero.characters}
        </p>

        <button 
          className='btn btn-primary mt-5'
          onClick={onReturn}>
            Regresar
        </button>
      </div>
    </div>
  )
}
