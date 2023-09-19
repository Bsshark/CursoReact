import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../../src/router/PrivateRoute";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en PrivateRouter', () => { 
    it('should show children if authenticated ', () => {
        
        Storage.prototype.setItem = jest.fn();
        
        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'Abraham'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    });
 })