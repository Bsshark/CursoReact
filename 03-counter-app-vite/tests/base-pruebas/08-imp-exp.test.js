import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data.js/heroes";

describe('Pruebas en 08-imp-exp', () => { 
    test('getHeroeById deberia retornar heroe por id', () => { 
        const id = 1;
        
        const heroe = getHeroeById(id);
        
        expect(heroe).toEqual({
            id: 1,
            name: 'Batman',
            owner: 'DC'
        });
     });
     test('getHeroesById debe retornar undefined si no existe', () => { 
        const id = 100;
        const heroe = getHeroeById( id );
        
        expect(heroe).toBeFalsy();
      });

      //Tarea
      test('getHeroesByOwner debe retornar un array con los heroes de DC', () => { 
        const ownerDC = 'DC';
        const ownerMarvel = 'Marvel';

        const heroesByDC = getHeroesByOwner(ownerDC);
        const heroesByMarvel = getHeroesByOwner(ownerMarvel);

        expect(heroesByDC.length).toBe(3);
        expect(heroesByDC).toEqual( heroes.filter((heroe) => heroe.owner === ownerDC ));

        expect(heroesByMarvel).toEqual(heroes.filter( (heroe) => heroe.owner === ownerMarvel ));

       })

 })