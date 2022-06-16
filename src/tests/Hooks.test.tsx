import App from '../App';
import {render, fireEvent, screen, getByRole, getByText, getByTestId} from "@testing-library/react";
import todoItem from "../TodoItem";

it('create todo', () => {
    render(<App/>);
    const addTodoField = screen.getByTestId<HTMLInputElement>('AddTodo');
    const todoList = screen.getByTestId<HTMLDivElement>('Todo_List');

    const newTodo = 'Test1';

    // Проверяем, что есть изначальное ToDo
    expect(todoList.childElementCount).toBe(1);

    // Нажимаем на поле для ввода
    fireEvent.click(addTodoField);
    // Изменяем его значение
    fireEvent.change(addTodoField, { target: { value : newTodo } });
    // Проверяем, что значение изменилось корректно
    expect(addTodoField.value).toBe(newTodo);
    // Убираем фокус с поля
    fireEvent.blur(addTodoField);
    // Проверяем что задача добавилась
    expect(todoList.childElementCount).toBe(2);
});

it('change todo text', () => {
    render(<App/>);
    const todoList = screen.getByTestId<HTMLDivElement>('Todo_List');
    const todoItem = todoList.firstElementChild;

    const newTodo = 'New Todo';

    const todoItemInput = getByRole(todoItem, 'textbox');
    const todoItemEdit = getByText<HTMLButtonElement>(todoItem, 'Edit');

    fireEvent.click(todoItemEdit);
    fireEvent.change(todoItemInput, { target: { value: newTodo } });
    fireEvent.blur(todoItemInput);

    expect(todoItemInput).toHaveValue(newTodo);
});
it('change todo status', () => {
    render(<App/>);
    const todoList = screen.getByTestId<HTMLDivElement>('Todo_List');
    const todoItem = todoList.firstElementChild;

    const changeStatus = getByTestId<HTMLDivElement>(todoItem, 'ChangeStatus');
    fireEvent.click(changeStatus);
    expect(changeStatus.className).toBe('TodoItem_Status TodoItem_Status_Done');
});
it('delete todo', () => {
    render(<App/>);
    const todoList = screen.getByTestId<HTMLDivElement>('Todo_List');

    expect(todoList.childElementCount).toBe(2);

    const todoItem = todoList.firstElementChild;
    const deleteItem = getByText<HTMLButtonElement>(todoItem, 'Delete');
    fireEvent.click(deleteItem);
    expect(todoList.childElementCount).toBe(1);
});
