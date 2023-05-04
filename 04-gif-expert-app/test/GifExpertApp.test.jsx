import { fireEvent, render, screen } from "@testing-library/react"
import { GifExpertApp } from "../src/GifExpertApp"

describe('Pruebas de GifExpertApp', () => {
    const dragonBallCategory = 'Dragon Ball';
    const onePieceCategory = 'One Piece';
    const onePunchCategory = 'One Punch';

    test('Debe añadir una categoría nueva', () => { 
        render( <GifExpertApp />);
        const form = screen.getByRole('form');
        const input = screen.getByRole('textbox');

        fireEvent.input(input, { target: { value: dragonBallCategory}});
        fireEvent.submit(form);

        fireEvent.input(input, { target: { value: onePieceCategory}});
        fireEvent.submit(form);
        
        expect(screen.getByText(dragonBallCategory));
        expect(screen.getByText(onePieceCategory));
        expect(screen.getAllByRole('heading', {level: 3}).length).toBe(3);



     })
     test('No debe añadir categorías repetidas', () => { 
        render(<GifExpertApp />);
        const form = screen.getByRole('form');
        const input = screen.getByRole('textbox');

        fireEvent.input(input, { target: { value: dragonBallCategory}});
        fireEvent.submit(form);

        fireEvent.input(input, { target: { value: onePunchCategory}});
        fireEvent.submit(form);

        expect(screen.getByText(dragonBallCategory));
        expect(screen.getAllByText(onePunchCategory).length).not.toBeGreaterThan(1);
        expect(screen.getAllByRole('heading', {level: 3}).length).toBe(2);
      })
 })