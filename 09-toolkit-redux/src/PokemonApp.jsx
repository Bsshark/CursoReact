import { useEffect } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { getPokemons } from "./store/slices/pokemon";
import { store } from "./store";

export const PokemonApp = () => {

  const dispatch = useDispatch();
  const {pokemons = [], isLoading, page} = useSelector(state => state.pokemons);
  

  useEffect(() => {
    dispatch( getPokemons() );
  }, [])

  

  
  

  return (
    <>
        <h1>Pokemon App</h1>
        <hr />

        <span>Loading: {isLoading ? `True`: `False`}</span>

        <ul>
          {
            pokemons.map((pokemon) => <li key={pokemon.url}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</li>)
          }
        </ul>

        {<button disabled={isLoading} onClick={() => dispatch(getPokemons(page))}>
          Next
        </button>}
    </>
  )
}
