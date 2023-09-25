import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en Search Page', () => { 

    beforeEach(() => jest.clearAllMocks());

    it('should show itself correctly with default values', () => {
        
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
    it('should show Batman and input with queryString value', () => {

        const searchValue = 'Batman';

        render(
            <MemoryRouter initialEntries={['/search?q=' + searchValue]}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe(searchValue);
        const img = screen.getByRole('img');
        expect(img.src).toContain('dc-batman.jpg');

        const noHeroDiv = screen.getByTestId('alertNoHeroDiv');
        expect(noHeroDiv.style.display).toBe('none');
    });
    it('should show error if hero not found', () => {
        const searchValue = 'Batman123';

        render(
            <MemoryRouter initialEntries={['/search?q=' + searchValue]}>
                <SearchPage />
            </MemoryRouter>
        );

        const noHeroDiv = screen.getByTestId('alertNoHeroDiv');
        const heroDiv = screen.getByTestId('alertHeroDiv');
        expect(noHeroDiv.style.display).toBe('');
        expect(heroDiv.style.display).toBe('none');

    });

    it('should call navigate to the new screen (Batman123)', () => {
        
        const inputValue = 'Batman123';
        const onSubmit = jest.fn();

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: inputValue}}); //nice

        const formSearch = screen.getByTestId('formSearch');
        fireEvent.submit(formSearch);

        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue.toLowerCase().trim()}`);
        

        screen.debug();

    });

 })