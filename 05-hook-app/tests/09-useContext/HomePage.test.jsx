import { render, screen } from '@testing-library/react';
import { HomePage } from '../../src/09-useContext/HomePage';
import { UserContext } from '../../src/09-useContext/context/UserContext';

describe('Pruebas en Home Page', () => { 

    const user = {
        id: 1,
        name: 'Abraham'
    }

    it('should show the component without the user', () => {
        render(
            <UserContext.Provider value={{user:null}}>
                <HomePage />
            </UserContext.Provider>
        )
        
        const preTag = screen.getByLabelText('pre');
        expect(preTag.innerHTML).toBe('null');
    });

    it('should show the component with the user', () => {
        render(
            <UserContext.Provider value = {{user}}>
                <HomePage/>
            </UserContext.Provider>
        )


        expect(screen.getByLabelText('small').innerHTML).toBe(user.name);
        expect(screen.getByLabelText('pre').innerHTML).toContain(user.id + '')
        expect(screen.getByLabelText('pre').innerHTML).toContain(user.name)
        

    });
    
 })