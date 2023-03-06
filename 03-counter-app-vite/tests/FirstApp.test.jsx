import {render} from '@testing-library/react';
import { FirstApp } from '../src/FirstApp';

describe('Pruebas en First App', () => { 
    test('Debe de hacer match con el snapshot', () => {
        const title = 'Soy Goku';
        const { container } = render(<FirstApp title={title}/>);

        expect(container).toMatchSnapshot();

     })

     test('debe mostrar el título en un h1', () => { 
        const title = 'Soy Goku'
        const { container, getByText } = render(<FirstApp title={title}/>);

        const h1 = container.querySelector('h1');
        expect(h1.innerHTML).toBe(title);
      })
 });