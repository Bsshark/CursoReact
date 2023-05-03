import {render, screen} from '@testing-library/react';
import { GifGridItem } from '../../src/Components/GifGridItem';

describe('Pruebas de GifGridItem', () => { 
   const title = 'Saitama';
   const url = 'http://localhost/onepunch.jpg';
    test('Deberia comprobar que el título está', () => { 
        const { container } = render(<GifGridItem title={title} url={url}></GifGridItem>);
        expect( screen.getByText(title) ).toBeTruthy();
     });
     test('Deberia comprobar que la url está', () => { 
        const { container } = render(<GifGridItem title={title} url={url}></GifGridItem>);
        expect( screen.getByAltText(title).getAttribute('src')).toBe(url);
     });
     test('Debería comprobar el snapshot', () => { 
        const { container } = render(<GifGridItem title={title} url={url}></GifGridItem>);
        expect(container).toMatchSnapshot();
      })

      test('Debe mostrar la imagen con url y alt indicado', () => { 
         render(<GifGridItem title={title} url={url} />);
         //expect(screen.getByRole('img').src).toBe(url);
         //expect(screen.getByRole('img').alt).toBe(title);
         const  { src, alt } = screen.getByRole('img');
         expect(src).toBe(url);
         expect( alt ).toBe(title);
       })

       test('Debe mostrar el titulo en el componente', () => { 
         render(<GifGridItem title={title} url={url} />);
         expect(screen.getByText(title)).toBeTruthy();
        })
 })
 