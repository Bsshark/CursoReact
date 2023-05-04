import { renderHook, waitFor } from "@testing-library/react"
import { useFetchGifs } from "../../src/hooks/useFetchGifs"

describe('Pruebas en el useFetchGifs', () => { 
    test('Debe regresar el estado inicial', () => { 
        
        const { result } = renderHook( () => useFetchGifs('One punch'));
        const { images, isLoading } = result.current;

        expect(images.length).toBe(0);
        expect(isLoading).toBeTruthy();
     });

     test('Debe retornar un array de imagenes y el isLoading en false', async() => { 
        const { result } = renderHook( () => useFetchGifs('One punch'));

        await waitFor(
            () => expect(result.current.images.length).toBeGreaterThan(0),
            {
                timeout: 3000
            }
        );

        const { images, isLoading } = result.current;

        expect(images.length).toBeGreaterThan(0);
        expect(isLoading).toBeFalsy();
    })
 })