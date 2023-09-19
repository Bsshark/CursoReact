import { types } from "../../../src/auth/types/types";

describe('Pruebas sobre los types', () => { 
    it('should return these types', () => {
        expect(types).toEqual({ 
            login: '[Auth] Login', 
            logout: '[Auth] Logout' 
        });
    });
 })