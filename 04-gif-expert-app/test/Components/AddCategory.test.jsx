import { fireEvent, render, screen } from "@testing-library/react"
import { AddCategory } from "../../src/Components/AddCategory"

describe('Pruebas del componente AddCategory', () => { 
    test('Debe cambiar el valor de la caja de texto', () => { 
        render(<AddCategory onNewCategory={() => {}}/>)
        const input = screen.getByRole('textbox');

        fireEvent.input(input, {target: {value: 'Saitama'}});

        expect(input.value).toBe('Saitama');
        screen.debug();
     });

     test('Debe de llamar onNewCategory si el input tiene valor', () => { 
        const inputValue = 'Saitama';
        //TODO
        const onNewCategory = jest.fn();

        render(<AddCategory onNewCategory={onNewCategory}/>);

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input(input, {target: {value: inputValue}});
        fireEvent.submit( form );

        expect(input.value).toBe('');
        expect(onNewCategory).toHaveBeenCalledTimes(1);
        expect(onNewCategory).toHaveBeenCalledWith(inputValue);

      });
      
      test('No debe llamar el onNewCategory si el input está vacio', () => { 
        const onNewCategory = jest.fn();

        render(<AddCategory onNewCategory={onNewCategory} />);
        const form = screen.getByRole('form');

        fireEvent.submit( form );

        expect(onNewCategory).not.toHaveBeenCalled();
       })
 })