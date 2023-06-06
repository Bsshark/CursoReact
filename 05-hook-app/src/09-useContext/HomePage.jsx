import { UserContext } from './context/UserContext';
import { useContext } from 'react'

export const HomePage = () => {

  const { user } = useContext( UserContext);

    return (
      <>
          <h1>Home Page <small>{user?.name}</small></h1>
          <hr />

          <pre>
          { JSON.stringify(user, null, 3) }
        </pre>
      </>
    )
  }
  