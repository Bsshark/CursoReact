import { render, screen } from "@testing-library/react";
import { TodoApp } from "../../src/08-useReducer/TodoApp";
import { useTodo } from "../../src/hooks/useTodo";

jest.mock('../../src/hooks/useTodo');

describe('Pruebas en el TodoApp', () => {

    useTodo.mockReturnValue({
        todos: [
             { id: 1, desc: 'Todo #1', done: false },
             { id: 2, desc: 'Todo #2', done: true }
        ], 
        todosCount: 2, 
        pendingTodosCount: 1, 
        handleNewTodo: jest.fn(), 
        handleDelTodo: jest.fn(), 
        handleToggleTodo: jest.fn()
    });

    it('should show the component correctly', () => {
        render(<TodoApp />);

        //screen.debug();

        expect(screen.getByText('Todo #1')).toBeTruthy();
        expect(screen.getByText('Todo #2')).toBeTruthy();
        expect(screen.getByRole('textbox')).toBeTruthy();

    });
 })