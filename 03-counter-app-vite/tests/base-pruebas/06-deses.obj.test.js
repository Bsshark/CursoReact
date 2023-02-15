import { usContext } from "../../src/base-pruebas/06-deses-obj";

describe('Pruebas en 06-deses-obj', () => { 
    test('usContext deberia devolver objeto', () => { 
        const clave = 'nombreClave';
        const edad = 15;

        const testUsContext = usContext({
            clave: clave,
            nombre: '',
            edad: edad
        });


        expect(testUsContext).toStrictEqual({
            nombreClave: clave,
            anios: edad,
            latlng: {
                lat: 14.1232,
                lng: -12.3232
            }
        });
     })
 })