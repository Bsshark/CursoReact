import {render, screen} from '@testing-library/react';
import { subtle } from 'crypto';
import { FirstApp } from '../src/FirstApp';

describe('Pruebas en First App', () => { 
  
  const title= "Hola, soy Goku";
  const subTitle = "Soy un subtitulo";

  test('Debe de hacer match con el snapshot', () => { 
    const { container } = render( <FirstApp title={title} />)
    expect(container).toMatchSnapshot();

   });

  test('Debe mostrar el mensaje "Hola, soy Goku', () => { 
    render(<FirstApp title = {title} /> );
    expect(screen.getByText(title)).toBeTruthy();

  });

  test('Debe de mostrar el título en un <h1></h1>', () => {
    render(<FirstApp title = {title} /> );
    expect(screen.getByRole('heading', { level: 1}).innerHTML).toContain(title);
  });

  test('Debe mostrar el subtitulo enviado por props', () => {
    render(<FirstApp 
      title = {title}
      subTitle={subTitle} /> 
    );

    expect(screen.getAllByText(subTitle).length).toBe(2);
  });


});