import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en Auth Slice', () => { 
    it('Debe regresar el estado inicial y llamarse "Auth" ', () => {
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
    });
    
    it('Debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    it('Debe realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(initialState, logout());
       /*  console.log(state); */

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });

    it('Debe realizar el logout y mostrar un mensaje de error', () => {
        const errorTestMessage = 'Usuario no válido';
        const state = authSlice.reducer(initialState, logout({errorMessage: errorTestMessage}));
        
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorTestMessage
        });
    });

    it('Deberia cambiar el estado al comprobar las credenciales', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials());

        expect(state.status).toBe('checking');
    });
 })