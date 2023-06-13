import { act, renderHook } from "@testing-library/react"
import { useCounter } from "../../src/hooks/useCounter";

describe('Pruebas en el useCounter', () => { 
    test('Debe retornar los valores por defecto', () => { 
        const { result } = renderHook( () => useCounter() );
        
        const { counter, decrement, increment, reset} = result.current;

        expect(counter).toBe(10); //Valor por defecto
        expect(decrement).toEqual(expect.any(Function));
        expect(increment).toEqual(expect.any(Function));
        expect(reset).toEqual(expect.any(Function));
    })

    test('Debe de generar el counter con el valor de 100', () => {
        const customCounter = 100;
        const { result } = renderHook(() => useCounter(customCounter));

        expect(result.current.counter).toBe(customCounter);

     });

     test('Debe incrementar el contador', () => { 
        const customCounter = 100;
        const inc = 2;
        const { result } = renderHook( () => useCounter(customCounter) );
        const { counter, increment } = result.current;

        act(() => {
            increment(inc);
        })

        expect(result.current.counter).toBe(customCounter+inc);

      });
      test('Debe decrementar el contador', () => { 
        const customCounter = 100;
        const dec = 2;
        const { result } = renderHook( () => useCounter(customCounter) );
        const { counter, decrement } = result.current;

        act(() => {
            decrement(dec);
        })

        expect(result.current.counter).toBe(customCounter-dec);

      });

      test('Debe resetear el contador', () => { 
        const customCounter = 100;
        const { result } = renderHook( () => useCounter(customCounter) );
        const { counter, increment, reset } = result.current;

        act(() => {
            increment();
            reset();
        })

        expect(result.current.counter).toBe(customCounter);

      }) 
 })