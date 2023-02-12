import { getSaludo } from "../../src/base-pruebas/base-pruebas/02-template-string";

describe('Pruebas en 02-template-string', () => { 
    test('getSaludo debe retornar Hola Nombre', () => { 
        const name ='Abraham';
        const message = getSaludo(name);

        expect(message).toBe(`Hola ${ name }`);
     })
 })