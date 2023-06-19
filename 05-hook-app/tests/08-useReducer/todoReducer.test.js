import { todoReducer } from '../../src/08-useReducer/todoReducer';

describe('Pruebas en el ToDo Reducer', () => {

    
    const initialState = [{
        id: 1,
        desc: 'Demo Todo',
        done: false
    }]

    it('should return initial status', () => {
        const newState = todoReducer( initialState, {});

        expect(newState).toBe(initialState);
    });

    it('should add a todo item', () => {
        const action = {
            type: 'Add ToDo',
            payload: {
                id: 2, 
                desc: 'Nuevo Todo',
                done: false
            }
        }

        const newState = todoReducer(initialState, action);
        expect(newState.length).toBe(2);
        expect(newState).toContain(action.payload);
    });

    it('should delete a todo item', () => {
        const action = {
            type: 'Del ToDo', payload: 1
        }

        const newState = todoReducer(initialState, action);
        expect(newState.length).toBe(0);
    });

    it('should toggle todos', () => {
        const action = {
            type: 'Toggle ToDo',
            payload: 1
        }

        const newState = todoReducer(initialState, action);
        expect(newState.filter(todo => todo.id === action.payload)[0].done).toBeTruthy();
        const newState2 = todoReducer(newState, action);
        expect(newState2.filter(todo => todo.id === action.payload)[0].done).toBeFalsy();
    });
 })