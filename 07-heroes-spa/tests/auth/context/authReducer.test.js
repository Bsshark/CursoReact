import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => { 

    const initialState = {
        logged: false
    }

    const user = {
        id: 2,
        name: 'Abraham'
    }
    
    it('should return default state', () => {

        const state = authReducer(initialState, {});
        

        expect(state).toBe(initialState);
    });

    it('should call login and state the user', () => {
        const action = {
            type: types.login,
            payload: user
        }
        const state = authReducer(initialState, action);

        expect(state).toEqual({
            logged: true,
            user: action.payload
        });
        expect(state.logged).toBeTruthy();

    });
    it('should call logout and delete name and log out false', () => {
        const loginState = {
            logged: true,
            user: user
        }

        const actionLogout = {
            type: types.logout
        }

        const stateLogout = authReducer(loginState, actionLogout);

        expect(stateLogout).toEqual({logged: false});
        expect(stateLogout.user).toBeFalsy();
        expect(stateLogout.logged).toBeFalsy();



    });
 })