import { UserContext } from './context/UserContext';
import { useContext } from 'react'

export const LoginPage = () => {

  const { user, setUser} = useContext(UserContext);

    return (
      <>
        <h1>Login Page</h1>
        <hr />

        <pre aria-label='pre'>
          { JSON.stringify(user, null, 3) }
        </pre>

        <button className="btn btn-primary"
          onClick= {() => setUser({id: 123, name: 'Juan', email: 'juan@gmail.com'})} >
          Establecer usuario
        </button>
    </>
  )
}
