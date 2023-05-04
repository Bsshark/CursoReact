import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/Components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en GifGrid', () => { 
    const category = 'One Punch';
    test('Debe mostrar el loading inicialmente', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        });

        render(<GifGrid category={category}/>);
        expect( screen.getByText('Cargando...') );
        expect( screen.getByText( category ));

    });

    test('Debe mostrar items cuando se cargan las imágenes mediante useFetchGifs', () => { 
        const gifs = [{
            id: 'abc',
            title: 'Saitama',
            url: 'http://localhost/saitama.jpg'
        }, {
            id: '123',
            title: 'Goku',
            url: 'http://localhost/goku.jgp'
        }]
        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true
        });
        render(<GifGrid category={category}/>);
        expect(screen.getAllByRole('img').length).toBe(2);

    })
 })