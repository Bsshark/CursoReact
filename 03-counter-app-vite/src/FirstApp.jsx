import PropTypes, { string } from 'prop-types';

export const FirstApp = ( { title, subTitle = 'Boo gana', name} ) => {

  //console.log(props);


  return (
    <>
      <h2>{ title}</h2>
      <p>{subTitle}</p>
      <p>{name}</p>
    </>
  )
}


FirstApp.propTypes = {
  title : PropTypes.string.isRequired,
  subTitle : PropTypes.string
}

FirstApp.defaultProps = {
  title: 'No hay titulo',
  subTitle: 'No hay subtitulo',
  name: 'Abraham de León'
}