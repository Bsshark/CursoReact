import { useNavigate } from "react-router-dom"
import { signInWithGoogle, registerUserWithEmailPassword, loginUserWithEmailPassword } from "../../firebase"
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({ email, password, displayName});

        if(!ok ) return dispatch(logout({errorMessage}));

        dispatch(login( { uid, displayName, email, photoURL } ));
        
    }
}

export const startLoginUserWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, displayName, errorMessage} = await loginUserWithEmailPassword({email, password});

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));
        navigate('/');
    }
}