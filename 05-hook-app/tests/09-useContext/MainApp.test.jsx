import { render, screen } from "@testing-library/react";
import { MainApp } from "../../src/09-useContext/MainApp";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en MainApp', () => { 
    it('should show Home Page', () => {
        render(
            <MemoryRouter>
                <MainApp/>
            </MemoryRouter>
            
        );
        expect(screen.getByText('Home Page')).toBeTruthy();
    });

    it('should show Login Page', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp/>
            </MemoryRouter>
            
        );
        screen.debug();
        expect(screen.getByText('Login Page')).toBeTruthy();
    });
    it('should show About Page', () => {
        render(
            <MemoryRouter initialEntries={['/about']}>
                <MainApp/>
            </MemoryRouter>
            
        );
        screen.debug();
        expect(screen.getByText('About Page')).toBeTruthy();
    });
 })