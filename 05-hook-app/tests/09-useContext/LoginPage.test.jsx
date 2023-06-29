import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../src/09-useContext/LoginPage";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { useContext } from "react";

describe('Pruebas en Login Page', () => { 

    const mockSetUser = jest.fn();


    it('should show the component without the user', () => {
        render(
            <UserContext.Provider value={{user:null}}>
                <LoginPage />
            </UserContext.Provider>
            
        )
        const preTag = screen.getByLabelText('pre');
        expect(preTag.innerHTML).toBe('null');
    });

    it('should call setUser when button is clicked', () => {
        render(
            <UserContext.Provider value={{user:null, setUser: mockSetUser}}>
                <LoginPage />
            </UserContext.Provider>
            
        )

        const setUserButton = screen.getByRole('button');
        fireEvent.click(setUserButton);

        expect(mockSetUser).toHaveBeenCalledWith({id: 123, name: 'Juan', email: 'juan@gmail.com'});
    });
 })