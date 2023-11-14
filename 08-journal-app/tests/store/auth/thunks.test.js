import { logOutFirebase, loginUserWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLogOut, startLoginUserWithEmailPassword } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en el thunk del Auth', () => { 
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());


    it('Deberia invocar el checkingCredentials', async() => {
        
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });

    it('startGoogleSignIn debe llamar checkingCredentials y login - OK', async() => {
        const loginData = {
            ok: true,
            ...demoUser
        };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    it('startGoogleSignIn debe llamar checkingCredentials y login - ERROR', async() => {
        const loginData = {
            ok: false,
            errorMessage: 'Error en Google Sign In'
        };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));

    });

    it('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - OK', async() => {
        const loginData = {
            ok: true,
            ...demoUser
        }
        const formData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName
        }

        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login({...loginData, ok: undefined}));
    });
    it('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - ERROR ', async() => {
        const loginData = {
            ok: false,
            errorMessage: 'Error al crear usuario.'
        }
        const formData = {
            email: demoUser.email,
            password: '123456',
            displayName: demoUser.displayName
        }

        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));
    });

    it('startLoginUserWithEmailPassword debe de llamar checkingCredentials y login - OK', async() => {
        const loginData = {
            ok: true,
            ...demoUser
        }
        const formData = {
            email: demoUser.email,
            password: '123456'
        }

        await loginUserWithEmailPassword.mockResolvedValue(loginData);

        await startLoginUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    it('startLoginUserWithEmailPassword debe de llamar checkingCredentials y login - ERROR', async() => {
        const loginData = {
            ok: false,
            errorMessage: 'Fallo en el startLoginUserWithEmailPassword'
        }
        const formData = {
            email: demoUser.email,
            password: '123456'
        }

        await loginUserWithEmailPassword.mockResolvedValue(loginData);

        await startLoginUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));
    });

    it('startLogOut debe llamar logOutFireBase, clearNotes y logOut', async() => {
        await startLogOut()(dispatch);

        expect(logOutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });
 })