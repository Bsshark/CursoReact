import { renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/";
import { act } from "react-dom/test-utils";

describe('Pruebas en useForm', () => { 

    const initialForm = {
        name: 'Abraham',
        email: 'abrahamlega@gmail.com'
    }

    it('should return default values', () => {
        const { result } = renderHook(() => useForm(initialForm));

        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: { name: 'Abraham', email: 'abrahamlega@gmail.com' },
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function)
          });

    });

    it('should change the forms name', () => {
        //Montar el hook
        const newValue = 'Juan'
        const { result } = renderHook(() => useForm(initialForm));
        //onInputChange

        act(() => {
            result.current.onInputChange({target: {name:'name', value: newValue}});
        })

        expect(result.current.name).toBe(newValue);
        expect(result.current.formState.name).toBe(newValue);
    });

    it('should make the form reset', () => {
        //Montar el hook
        const newValue = 'Juan'
        const { result } = renderHook(() => useForm(initialForm));
        const { onInputChange, onResetForm } = result.current;
        //onInputChange

        act(() => {
            onInputChange({target: {name:'name', value: newValue}});
            onResetForm();
        })

        expect(result.current.name).toBe(initialForm.name);
        expect(result.current.formState.name).toBe(initialForm.name);
    });

 })