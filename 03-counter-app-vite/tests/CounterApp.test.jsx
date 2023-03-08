import {render, screen} from '@testing-library/react';
import { CounterApp } from '../src/CounterApp';

describe('Pruebas en CounterApp', () => { 

    const init = 100;
    
    test('Debe hacer match con el snapshot', () => { 
        const { container } = render(<CounterApp value={init}/>);
        expect(container).toMatchSnapshot();
     })

     test('Debe mostrar el valor inicial de 100', () => { 
        const { container } = render(<CounterApp value={init}/>);
        expect(screen.getByText(100)).toBeTruthy();
      })
 })