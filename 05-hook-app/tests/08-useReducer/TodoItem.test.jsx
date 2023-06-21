import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe('Pruebas en el componente TodoItem', () => { 

    const todo = {
        id: 1,
        desc: 'Pieda del Alma',
        done: false
    }

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    it('should complete the Todo Pendant to complete', () => {
        render(<TodoItem 
                todo={todo} 
                onToggleToDo={onToggleTodoMock} 
                onDeleteTodo={onDeleteTodoMock}
            />);

        const liElement = screen.getByRole('listitem');

        expect(liElement.className).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span-li');
        expect(spanElement.className.trim()).toBe('align-self-center');

        //screen.debug();
    });

    it('should show the completed ToDo', () => {

        todo.done = true;

        render(<TodoItem 
                todo={todo} 
                onToggleToDo={onToggleTodoMock} 
                onDeleteTodo={onDeleteTodoMock}
            />);

        const spanElement = screen.getByLabelText('span-li');
        expect(spanElement.className).toContain('text-decoration-line-through');

        //screen.debug();
    });

    it('should span call toggleTodo onClick', () => {
        render(<TodoItem 
            todo={todo} 
            onToggleToDo={onToggleTodoMock} 
            onDeleteTodo={onDeleteTodoMock}
        />);

        const spanElement = screen.getByLabelText('span-li');
        fireEvent.click(spanElement);

        expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);
    });

    it('should button call deleteTodo onClick', () => {
        render(<TodoItem 
            todo={todo} 
            onToggleToDo={onToggleTodoMock} 
            onDeleteTodo={onDeleteTodoMock}
        />);

        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);

        expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
    });
 })