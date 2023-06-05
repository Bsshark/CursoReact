export const todoReducer = (initialState, action) => {
    switch (action.type) {
        case 'Add ToDo':
            return [...initialState, action.payload];

        case 'Del ToDo':
            return initialState.filter(todo => todo.id !== action.payload);

        case 'Toggle ToDo':
            return initialState.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }

                return todo;
            })

        default:
            return initialState;
    }
}