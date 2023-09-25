import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRoute } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))


describe('Pruebas en componente Navbar', () => { 

    //Mock
    const logoutSpy = jest.fn();
    const contextValue = {
        logged: true,
        user: {
            id: 1,
            name: 'Abraham'
        },
        logout: logoutSpy
    }

    beforeEach(() => jest.clearAllMocks());


    it('should show the user name', () => {

        const userName = 'Abraham';

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar>

                    </Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        /* console.log(screen.debug()); */
        expect(screen.getByText(userName));
    });

    it('should call navigate with /login and replace and log out the user onclick', () => {
        

        

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter location='/'>
                    <Navbar onLogout={logoutSpy}>

                    </Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        /* console.log(screen.debug()); */
        const logoutBtn = screen.getByTestId('btn-logout');

        fireEvent.click(logoutBtn);

        expect(logoutSpy).toHaveBeenCalled();
        /* expect(global.window.location.pathname).toContain('/login'); */
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true});

    });
 })