import { getImagen } from "../../src/base-pruebas/11-async-await"

describe('Pruebas en 11-async-await', () => { 
    test('getImagen debería devolver una url de la imagen', async() => {
        const url = await getImagen();

        console.log(url);

        expect(typeof url).toBe('string');
    })
 })