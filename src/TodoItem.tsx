import './styles/TodoItem.css';
import {useState} from "react";

type Props = {
    todoItem: TodoType
    changeTodoCb: (item: TodoType) => void
    deleteTodoCb: () => void
}

const TodoItem = ({ todoItem, changeTodoCb, deleteTodoCb }: Props) => {
    const [status, setStatus] = useState<string>(todoItem.status);
    const [value, setValue] = useState<string>(todoItem.content);

    const [disabled, setDisabled] = useState<boolean>(true);

    const statuses = ['Undone', 'Done', 'Cancel'];

    const changeStatus = () => {
        let index = statuses.indexOf(status);
        if(index >= statuses.length-1) index = 0;
        else index++;
        setStatus(statuses[index]);
        todoItem.status = statuses[index];
        changeTodoCb(todoItem);
    }

    const startChanging = () => {
        setDisabled(false);
    }

    const endChanging = () => {
        setDisabled(true);
        todoItem.content = value;
        todoItem.status = status;
        changeTodoCb(todoItem);
    }

    const isDone = status !== 'Done';

    return (
        <div className={'TodoItem'}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`TodoItem_Status TodoItem_Status_${status}`} onClick={changeStatus}/>
                <input
                    className={'TodoItem_Input'}
                    style={{ textDecoration: isDone ? 'none' : 'line-through', color: isDone ? 'white' : '#ccc' }}
                    disabled={disabled}
                    onBlur={endChanging}
                    value={value}
                    onChange={e => setValue(e.currentTarget.value)}
                />
            </div>
            <div>
                <button onClick={startChanging} className={'Todo_Button'}>Edit</button>
                <button onClick={deleteTodoCb} className={'Todo_Button'}>Delete</button>
            </div>
        </div>
    );
}

export default TodoItem;
