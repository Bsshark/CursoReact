import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { AppRouter } from "../../../src/router/AppRouter";

describe('Pruebas en AppRouter', () => { 
    it('should show login if not authenticated', () => {

        const contextValue = {
            logged: false
        }

        const { container } = render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
        expect(container).toMatchSnapshot();
    });
    it('should show Marvel component if authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 1,
                name: 'Abraham'
            }
        }

        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();
    });
 })