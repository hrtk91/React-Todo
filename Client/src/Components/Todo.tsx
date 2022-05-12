import React from 'react'
import TodoCreater from './TodoCreater'
import TodoItem from './TodoItem'
import Todo from '../Models/Todo'
import TodoService from '../Services/TodoService'

/**
 * TodoクラスのProps型
 */
interface IProps {

}

/**
 * TodoクラスのState型
 */
interface IState {
    /** Todoのリスト */
    todos: Todo[],
    /**
     * 画面に表示するTodoのフィルター種別  
     * TodoFilterに以下の種別定義   
     * ・NotCompleted = 未完了のみ  
     * ・Completed = 完了のみ  
     * ・All = すべて  
     */
    todoFilter: string,
}

/**
 * IState.todoFilterで使用する種別の定義
 */
const TodoFilter = {
    /** 未完了のみ */
    NotCompleted: 'NotCompleted',
    /** 完了のみ */
    Completed: 'Completed',
    /** すべて */
    All: 'All'
}

/**
 * Todoアプリコンポーネント
 */
export default class TodoApp extends
    React.Component<IProps, IState> {
    /** コンストラクタ */
    constructor (props: IProps) {
        super(props)
        this.state = {
            todos: [],
            todoFilter: TodoFilter.NotCompleted
        }
    }

    /**
     * 初期化処理  
     * 未完了のTodoリストを取得する  
     */
    async componentDidMount (): Promise<void> {
        await this.initialize()
    }

    /** レンダリング */
    render () {
        const todos = this.state.todos.map(todo =>
            (
                <article key={todo.id} className='container-fluid pt-3'>
                    <TodoItem todo={todo} onUpdateTodo={this.onUpdateOrDeleteTodo} onDeleteTodo={this.onUpdateOrDeleteTodo}></TodoItem>
                </article>
            ))
        return (
            <div className='container'>
                <section className='container-fluid'>
                    <div className='row'>
                        <h1>Todo List</h1>
                    </div>
                </section>
                <TodoCreater onCreatedTodo={this.onCreatedTodo} />
                <section className='container-fluid'>
                    <div className='row'>
                        <div className="input-group mt-2">
                            <label className="input-group-text">表示</label>
                            <select className="todo-selecter form-select w-auto" onChange={this.onChangeTodoSelector}>
                                <option value={TodoFilter.NotCompleted}>未完了のみ</option>
                                <option value={TodoFilter.Completed}>完了のみ</option>
                                <option value={TodoFilter.All}>すべて</option>
                            </select>
                        </div>
                    </div>
                </section>
                {todos}
            </div>
        )
    }

    /**
     * 指定フィルターに合致するTodoをサーバーから取得する  
     * @param todoFilter フィルター種別
     */
    initialize = async (todoFilter?: string): Promise<void> => {
        const filter = todoFilter ?? this.state.todoFilter

        // フィルターごとに取得メソッドを変更
        const func = filter === TodoFilter.NotCompleted
            ? TodoService.getNotCompletedTodos
            : (filter === TodoFilter.Completed
                ? TodoService.getCompletedTodos
                : TodoService.getAllTodos)

        // Todoの取得
        const todos = await func()

        // 取得したTodoリストに更新
        this.setState({ todos })
    }

    /**
     * Todo作成の通知を受け取ってTodoリストを再取得する
     */
    onCreatedTodo = async (): Promise<void> => {
        try {
            await this.initialize()
        } catch (ex) {
            alert('Todoの再読み込みに失敗しました。\r\nページを更新してください。')
            console.log(`Todoの初期化処理に失敗しました。\r\nex : ${ex}`)
        }
    }

    /**
     * Todo更新/削除の通知を受け取ってTodoリストを再取得する
     * @param _id 更新したTodoのId
     */
    onUpdateOrDeleteTodo = async (_id: number): Promise<void> => {
        try {
            await this.initialize()
        } catch (ex) {
            alert('Todoの再読み込みに失敗しました。\r\nページを更新してください。')
            console.log(`Todoの初期化処理に失敗しました。\r\nex : ${ex}`)
        }
    }

    /**
     * フィルター種別変更通知を受け取ってTodoリストを再取得する
     * @param ev <select>要素のonChangeイベント
     */
    onChangeTodoSelector = async (ev: any): Promise<void> => {
        const filter = ev.target.value
        this.setState({ todoFilter: filter })
        await this.initialize(filter)
    }
}
