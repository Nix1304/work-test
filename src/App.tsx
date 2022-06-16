import React, {useState} from 'react';
import './styles/App.css';
import TodoItem from "./TodoItem";

const App = () => {
    const storageTodo = localStorage.getItem('todo');
    const [todos, setTodos] = useState<TodoType[]>(
        JSON.parse(storageTodo ? storageTodo : '[{"content":"Тестовое задание","status":"Undone"}]')
    );
    const [statusFilter, setStatusFilter] = useState<'All' | 'Act' | 'Comp' | 'Cancel'>('All');
    const [undoneCount, setUndoneCount] = useState(todos.filter(t => t.status === 'Undone').length);

    const [newTodo, setNewTodo] = useState<string>('');

    const changeTodo = (index: number, todoItem: TodoType) => {
        const _todos = todos;
        _todos[index] = todoItem;
        setTodos(_todos);
        setUndoneCount(_todos.filter(t => t.status === 'Undone').length);
        localStorage.setItem('todo', JSON.stringify(todos));
    }

    const addTodo = () => {
        if(newTodo === '') return;
        todos.push({content: newTodo, status: 'Undone'});
        setTodos(todos);
        setUndoneCount(todos.filter(t => t.status === 'Undone').length);
        localStorage.setItem('todo', JSON.stringify(todos));
        setNewTodo('');
    }

    const deleteTodo = (index: number) => {
        const _todos = [...todos.slice(0, index), ...todos.slice(index+1, todos.length)];
        setTodos(_todos);
        localStorage.setItem('todo', JSON.stringify(_todos));
    }

    const clearCompleted = () => {
        setTodos(todos.filter(t => t.status !== 'Done'));
        localStorage.setItem('todo', JSON.stringify(todos.filter(t => t.status !== 'Done')));
    }

    const filterFunc = (todo: TodoType) => {
        if(statusFilter === 'All') return true;
        else if(statusFilter === 'Act') return todo.status === 'Undone';
        else if(statusFilter === 'Comp') return todo.status === 'Done';
        else if(statusFilter === 'Cancel') return todo.status === 'Cancel';
    }

    return (
        <div id='App'>
            <h1 className={'Title'}>todos</h1>
            <div className="Container">
                <div className="Todo_Header">
                    <input
                        data-testid={'AddTodo'}
                        className={'AddTodo'}
                        placeholder={'Add new task'}
                        type="text"
                        value={newTodo}
                        onChange={e => setNewTodo(e.currentTarget.value)}
                        onBlur={addTodo}
                    />
                </div>

                <div className="Todo_List" data-testid={'Todo_List'}>
                    {todos.filter(filterFunc).map(value => (
                        <TodoItem
                            todoItem={value}
                            key={value.content}
                            changeTodoCb={((item: TodoType) => changeTodo(todos.indexOf(value), item))}
                            deleteTodoCb={() => deleteTodo(todos.indexOf(value))}
                        />
                    ))}
                </div>

                <div className="Todo_Footer">
                    <div className="Todo_Left">{undoneCount} items left</div>

                    <div className="Buttons_Filter">
                        <button
                            disabled={statusFilter === 'All'}
                            onClick={() => setStatusFilter('All')}
                            className={'Todo_Button'}
                        >
                            All
                        </button>
                        <button
                            disabled={statusFilter === 'Act'}
                            onClick={() => setStatusFilter('Act')}
                            className={'Todo_Button'}
                        >
                            Active
                        </button>
                        <button
                            disabled={statusFilter === 'Comp'}
                            onClick={() => setStatusFilter('Comp')}
                            className={'Todo_Button'}
                        >
                            Complete
                        </button>
                        <button
                            disabled={statusFilter === 'Cancel'}
                            onClick={() => setStatusFilter('Cancel')}
                            className={'Todo_Button'}
                        >
                            Canceled
                        </button>
                    </div>

                    <button className={'Todo_Button'} onClick={clearCompleted}>
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
