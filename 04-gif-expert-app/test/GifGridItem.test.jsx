import {render} from '@testing-library/react';
import { GifGridItem } from '../src/Components/GifGridItem';

describe('Pruebas de GifGridItem', () => { 
    test('Deberia comprobar que el título está', () => { 
        const { container } = render(<GifGridItem></GifGridItem>);
        expect(container.title).toBeTruthy();
     });
     test('Deberia comprobar que la url está', () => { 
        const { container } = render(<GifGridItem></GifGridItem>);
        expect(container.url).toBeTruthy();
     });
     test('Debería comprobar el snapshot', () => { 
        const { container } = render(<GifGridItem></GifGridItem>);
        expect(container).toMatchSnapshot();
      })
 })
 