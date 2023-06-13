import { render, screen } from "@testing-library/react";
import { MultipleCustomHooks } from "../../src/03-examples";

describe('Pruebas de MultipleCustomHooks', () => { 
    it('should show the component by default', () => {
        render(<MultipleCustomHooks/>);

        expect(screen.getByText('Cargando...'));
        expect(screen.getByText('Breaking Bad Quotes'));
        
        const nextButton = screen.getByRole('button', {name: 'Next quote'});
        expect(nextButton.disabled).toBeTruthy();

        screen.debug();

    });
 })