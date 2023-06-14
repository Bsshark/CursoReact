import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from "../../src/03-examples";
import { useFetch } from "../../src/hooks/useFetch"; //Centrarse en el archivo para el mock
import { useCounter } from "../../src/hooks";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas de MultipleCustomHooks', () => {
    const mockIncrement = jest.fn();
    useCounter.mockReturnValue({
        counter: 0,
        increment: mockIncrement
    })

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show the component by default', () => {

        useFetch.mockReturnValue({
            data: null, 
            isLoading: true, 
            hasError: null
        });

        render(<MultipleCustomHooks/>);

        expect(screen.getByText('Cargando...'));
        expect(screen.getByText('Breaking Bad Quotes'));
        
        const nextButton = screen.getByRole('button', {name: 'Next quote'});
        expect(nextButton.disabled).toBeTruthy();

        screen.debug();

    });
    it('should show a Quote', () => {

        useFetch.mockReturnValue({
            data: [{author: 'Abraham', quote: 'Hola Mundo'}], 
            isLoading: false, 
            hasError: null
        });

        render(<MultipleCustomHooks />);
        expect(screen.getByText('Hola Mundo')).toBeTruthy();
        expect(screen.getByText('Abraham')).toBeTruthy();

        const nextButton = screen.getByRole('button', {name: 'Next quote'});
        expect(nextButton.disabled).toBeFalsy();

    });

    it('should call the increment function', () => {

        

        useFetch.mockReturnValue({
            data: [{author: 'Abraham', quote: 'Hola Mundo'}, {author: 'Abraham2', quote: 'Hola Mundo2'}], 
            isLoading: false, 
            hasError: null
        });

        

        render(<MultipleCustomHooks />);
        const nextButton = screen.getByRole('button', {name: 'Next quote'});
        fireEvent.click(nextButton);

        expect(mockIncrement).toHaveBeenCalled();
    });
 })