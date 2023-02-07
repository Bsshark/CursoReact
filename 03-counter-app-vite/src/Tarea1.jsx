import { Fragment } from "react"



const newMessage = {
  message: 'Hola mundo',
  title: 'Abraham'
}

function getMessage() {
  return newMessage.message;
}

export const FirstApp = () => {

  return (
    <>
    <h2>{ getMessage()  }</h2>
    <p>Ey</p>
    </>
  )
}
