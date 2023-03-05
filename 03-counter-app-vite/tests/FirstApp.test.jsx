import {render} from '@testing-library/react';
import { FirstApp } from '../src/FirstApp';

describe('Pruebas en First App', () => { 
    test('Debe de hacer match con el snapshot', () => {
        const title = 'Soy Goku'
        render(<FirstApp title={title}/>);
     })
 });