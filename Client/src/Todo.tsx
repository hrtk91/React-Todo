import React from 'react';
import * as  DTO from './DTO';

export default class Todo extends
    React.Component<{}, {
        todos: DTO.Todo[],
        content: string,
        dueDate: Date,
    }> {

    constructor(props: {}) {
        super(props);
        this.state = {
            todos: [],
            content: '',
            dueDate: (new Date()),
        };

        this.addTodo = this.addTodo.bind(this);
    }

    render() {
        const todos = this.state.todos.map(todo => <li key={todo.id}>{todo.content}</li>);
        return (
            <div className='container'>
                <div className='row'>
                    <h1>Todo List</h1>
                    <div className='input-group'>
                        <textarea className='form-control' onChange={ev => this.setState({ content: ev.target.value })}></textarea>
                        <button type='button' className='btn btn-primary' onClick={this.addTodo}>追加</button>
                    </div>
                    <ul>
                        {todos}
                    </ul>
                    <button className='btn btn-primary' onClick={() => alert('clicked')}>Test Button</button>
                </div>
            </div>
        )
    }

    async componentDidMount(): Promise<void> {
        await this.initialize();
    }

    async initialize(): Promise<void> {
        const todos = await this.getAllTodos();
        this.setState({ todos: todos });
    }

    async getAllTodos(): Promise<DTO.Todo[]> {
        return await fetch('http://localhost:5200/Todo/GetAll', { method: 'GET', mode: 'cors' }).then(res => res.json());
    }

    async addTodo(): Promise<void> {
        const content = this.state.content;
        const dueDate = this.state.dueDate.toUTCString();

        try {
            await fetch(`http://localhost:5200/Todo/Create?content=${content}&dueDate=${dueDate}`, { method: 'POST', mode: 'cors' });
        }
        catch (ex) {
            alert('Todoの追加処理に失敗しました。\r\nもう一度やり直してください。');
            console.log(`Todoの追加処理に失敗しました。\r\nex : ${ex}`);
        }

        try {
            await this.initialize();
        }
        catch (ex) {
            alert('Todoの再読み込みに失敗しました。\r\nページを更新してください。');
            console.log(`Todoの初期化処理に失敗しました。\r\nex : ${ex}`);
        }
    }
}
