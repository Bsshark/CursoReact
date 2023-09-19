import { render, screen } from "@testing-library/react";
import { Publicroute } from "../../../src/router/PublicRoute";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe('Pruebas en PublicRoute', () => { 
    it('should show children if not authenticated ', () => {
        
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <Publicroute>
                    <h1>Ruta pública</h1>
                </Publicroute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta pública')).toBeTruthy();

    });

    it('should navigate if authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'Abraham',
                id: 2
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={
                            <Publicroute>
                                <h1>Ruta pública</h1>
                            </Publicroute>
                        }/>
                        <Route path='marvel' element={<h1>Pag. Marvel</h1>}></Route>
                    </Routes>

                    
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Pag. Marvel')).toBeTruthy();
    });
 })