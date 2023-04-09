import {fireEvent, render, screen} from '@testing-library/react';
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

      test('Debe incrementar con el botón +1', () => { 
        render(<CounterApp value={init} />);
        fireEvent.click( screen.getByText('+1') );

        expect( screen.getByText('101')).toBeTruthy();
       });

       test('Debe decrementar con el botón -1', () => { 
        render(<CounterApp value={init} />);
        fireEvent.click( screen.getByText('-1') );
        //screen.debug();
        expect( screen.getByText('99')).toBeTruthy();
       })

       test('Debe funcionar el botón Reset', () => { 
        render(<CounterApp value={355} />);
        fireEvent.click( screen.getByText('+1') );
        //fireEvent.click(screen.getByText('Reset'));

        fireEvent.click(screen.getByRole('button', {name: 'btn-reset'}));

        expect(screen.getByText(355)).toBeTruthy();
       })
 })