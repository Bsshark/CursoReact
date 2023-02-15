import { getHeroeByIdAsync } from "../../src/base-pruebas/09-promesas";

describe('Pruebas en 09-Promesas', () => { 
    test('getHeroesByIdAsync debe retornar un héroe', (done) => { 
        const id = 1;
        getHeroeByIdAsync( id )
            .then(hero => {
                expect(hero).toEqual({
                    id: 1,
                    name: 'Batman',
                    owner: 'DC'
                });
                done();
            })

     });
     test('getHeroesByIdAsync debe de obtener un error si héroe no existe', (done) => { 
        const id = 100;
        getHeroeByIdAsync( id )
            .then( hero => {

                expect(heroe).toBeFalsy();

                done();
            })
            .catch(error => {

                expect(error).toBe('No se pudo encontrar el héroe con id ' + id);

                done();
            })

     })
 })