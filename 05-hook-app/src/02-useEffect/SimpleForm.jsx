import React, { useEffect, useState } from 'react'

export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        username: 'abraham',
        email: 'abrahamlega@gmail.com'
    })

    const { username, email } = formState;

    const onInputChange = ({target}) => {
        const {name, value} = target;

        setFormState({
            ...formState,
            [ name ]: value
        })

    }

    useEffect(() => {
        console.log('cambió el FormState');
      }, []);

    useEffect(() => {
      console.log('cambió el FormState');
    }, [formState]);

    useEffect(() => {
        console.log('cambió el email');
      }, [email]);
    

  return (
    <>
        <h1>Formulario Simple</h1>
        <hr/>

        <input type="text" className='form-control'
        placeholder='Username' name="username"
        value={username} onChange={onInputChange}/>

        <input type="email" className='form-control mt-2'
        placeholder='abrahamlega@gmail.com' name="email"
        value={email} onChange={onInputChange}/>
    </>
  )
}
