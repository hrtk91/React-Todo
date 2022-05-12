import React from 'react'
import Todo from '../Models/Todo'
import TodoService from '../Services/TodoService'
import DatePicker from './DatePicker'

/**
 * TodoItemクラスのProps型
 */
interface IProps {
    /** Todo */
    todo: Todo
    /** Todo更新成功時のコールバック関数 */
    onUpdateTodo?: (id: number) => void
    /** Todo削除成功時のコールバック関数 */
    onDeleteTodo?: (id: number) => void
}

/**
 * TodoItemクラスのState型
 */
 interface IState {
    /** Todo.id */
    id: number,
    /** Todo.content */
    content: string,
    /** Todo.dueDate */
    dueDate: Date,
    /** Todo.doneAt */
    doneAt: Date | null,
    /** Tood.created */
    created: Date,
    /** 更新ボタンの有効状態 */
    disableUpdateBtn: boolean,
}

/**
 * Todoコンポーネント
 */
export default class TodoItem extends React.Component<IProps, IState> {
    /** コンストラクタ */
    constructor (props: IProps) {
        super(props)
        const today = new Date()
        this.state = {
            id: 0,
            content: '',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            doneAt: null,
            created: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            disableUpdateBtn: true
        }
    }

    /**
     * 初期化処理  
     * propsのtodoをstateに転記  
     */
    componentDidMount () {
        this.setState({
            id: this.props.todo.id,
            content: this.props.todo.content,
            dueDate: this.props.todo.dueDate,
            doneAt: this.props.todo.doneAt,
            created: this.props.todo.created
        })
    }

    /** レンダリング */
    render () {
        return (
            <div key={this.props.todo.id} className={`container-fluid border ${this.isExpired() ? 'border-danger' : ''}`}>
                {/* ヘッダ */}
                <div className="row mt-2">
                    {/* IDと未完了警告エリア */}
                    <div className="col-sm">
                        <label>ID:{this.state.id}</label>
                        {
                            this.isExpired()
                                ? (
                                    <div className="d-inline-block alert alert-danger w-auto p-2 ms-2">
                                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                        <span>期日を過ぎています！</span>
                                    </div>
                                )
                                : ''
                        }
                    </div>
                    {/* 操作ボタンエリア */}
                    <div className="col-auto">
                        <div className="d-inline-block">
                            <button
                                type='button'
                                className={`btn ${this.state.disableUpdateBtn ? 'btn-secondary' : 'btn-primary'}`}
                                onClick={this.onClickUpdateBtn}
                                disabled={this.state.disableUpdateBtn}>
                                    更新
                            </button>
                        </div>
                        <div className="d-inline-block ms-2">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClickDeleteBtn}>削除</button>
                        </div>
                    </div>
                </div>
                {/* メイン */}
                <div className='row pt-2 pb-2'>
                    {/* コンテンツ入力エリア */}
                    <div className='d-inline-block align-top col-lg'>
                        <div className="row">
                            <div className='w-100'>
                                <div style={({ position: 'relative' })}>
                                    {/* Todo.contentのテキストエリア */}
                                    <textarea
                                        className={`form-control w-100 ${this.state.content.length > 100 ? 'is-invalid' : ''}`}
                                        style={({
                                            boxSizing: 'border-box',
                                            minHeight: '7rem'
                                        })}
                                        defaultValue={this.state.content}
                                        onChange={this.onChangeContent} >
                                    </textarea>
                                    {/* テキストエリアの入力文字数表記 */}
                                    <div className={'pe-none text-black-50 w-auto m-2'}
                                        style={({ position: 'absolute', right: '.2rem', bottom: '0rem' })}>
                                        <label>{`${this.state.content.length} / 100`}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 日付関連エリア */}
                    <div className='d-inline-block col-auto'>
                        {/* 予定日 */}
                        <div className="">
                            <label>予定日</label>
                            <DatePicker defaultValue={this.props.todo.dueDate} onChange={this.onChangeDueDate}></DatePicker>
                        </div>
                        {/* 完了日 */}
                        <div className="mt-3">
                            <label>完了日</label>
                            <div>
                                <input
                                    type="checkbox"
                                    id={`doneCheck${this.state.id}`}
                                    autoComplete="off"
                                    onChange={this.onChangeDoneCheck}
                                    defaultChecked={this.props.todo.doneAt != null} />
                                <label className="ps-1" htmlFor={`doneCheck${this.state.id}`}>
                                    {
                                        this.state.doneAt != null
                                            ? `${this.state.doneAt?.getFullYear()} / ${this.state.doneAt?.getMonth() + 1} / ${this.state.doneAt?.getDate()}`
                                            : '---- / -- / --'
                                    }
                                </label>
                            </div>
                        </div>
                        {/* 作成日 */}
                        <div className="mt-3">
                            <label>作成日</label>
                            <DatePicker defaultValue={this.props.todo.created} small={true} disabled={true}></DatePicker>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Todo.contentの変更通知  
     * props.todoと比較して変更があれば「更新」ボタンを有効化する
     * @param ev テキストエリアのonChangeイベント
     */
    onChangeContent = (ev: any): void => {
        const content = ev.target.value
        const hasUpdate = this.hasUpdate(content, this.state.dueDate, this.state.doneAt)
        this.setState({
            content,
            disableUpdateBtn: !hasUpdate
        })
    }

    /**
     * 予定日の変更通知
     * props.todoと比較して変更があれば「更新」ボタンを有効化する
     * @param newLocaleDate 変更後のDueDate
     */
    onChangeDueDate = (newLocaleDate: Date): void => {
        const hasUpdate = this.hasUpdate(this.state.content, newLocaleDate, this.state.doneAt)
        this.setState({
            dueDate: newLocaleDate,
            disableUpdateBtn: !hasUpdate
        })
    }

    /**
     * 完了日時の変更通知
     * props.todoと比較して変更があれば「更新」ボタンを有効化する
     * @param ev チェックボックスのonChangeイベント
     */
    onChangeDoneCheck = (ev: any): void => {
        const checked = ev.target.checked
        const today = new Date()
        const doneAt = checked ? new Date(today.getFullYear(), today.getMonth(), today.getDate()) : null
        const hasUpdate = this.hasUpdate(this.state.content, this.state.dueDate, doneAt)

        this.setState({
            doneAt,
            disableUpdateBtn: !hasUpdate
        })
    }

    /**
     * 更新ボタンのクリック時処理  
     * サーバーにTodoの更新依頼し、成功した場合props.onUpdateTodoを実行
     */
    onClickUpdateBtn = async (): Promise<void> => {
        try {
            await TodoService.updateTodo(new Todo(
                this.state.id,
                this.state.content,
                this.state.dueDate,
                this.state.created,
                this.state.doneAt
            ))
            this.setState({ disableUpdateBtn: true })
            this.props.onUpdateTodo?.(this.state.id)
        } catch (ex) {
            alert('Todoの更新処理に失敗しました。\r\n100文字を超えて入力していないか確認し、もう一度やり直してください。')
            console.log('Todoの更新処理に失敗しました。')
            console.table(ex)
        }
    }

    /**
     * 削除ボタンのクリック時処理  
     * サーバーにTodoの削除依頼し、成功した場合props.onDeleteTodoを実行
     */
    onClickDeleteBtn = async (): Promise<void> => {
        try {
            const id = this.state.id
            if (confirm(`ID:${id}を削除します。\r\nよろしいですか？`)) {
                await TodoService.deleteTodo(id)
                this.props.onDeleteTodo?.(id)
            }
        } catch (ex) {
            alert('Todoの削除処理に失敗しました。\r\nもう一度やり直してください。')
            console.log('Todoの削除処理に失敗しました。')
            console.table(ex)
        }
    }

    /**
     * Todoが予定日を過ぎているか確認する
     * @returns true: 予定日を過ぎている, false: 予定日を過ぎていない
     */
    isExpired = (): boolean => {
        const doneAt = this.state.doneAt
        const dueDate = this.state.dueDate
        const today = (new Date())
        return doneAt == null &&
            (dueDate.getFullYear() < today.getFullYear() ||
            dueDate.getMonth() < today.getMonth() ||
            dueDate.getDate() < today.getDate())
    }

    /**
     * Todoが変更されているか確認する
     * @param content Todo.content
     * @param dueDate Todo.dueDate
     * @param doneAt Todo.doneAt
     * @returns true: 変更あり, false: 変更なし
     */
    hasUpdate = (content: string, dueDate: Date, doneAt: Date | null): boolean => {
        const hasUpdateContent = content !== this.props.todo.content
        const hasUpdateDueDate = this.hasUpdateDate(dueDate, this.props.todo.dueDate)
        const hasUpdateDoneAt = this.hasUpdateDate(doneAt, this.props.todo.doneAt)
        return (hasUpdateContent || hasUpdateDueDate || hasUpdateDoneAt)
    }

    /**
     * 現在と前の日時を比較して更新されているか確認する  
     * ※ 年月日のみを比較する  
     * @param current 現在
     * @param prev 前
     * @returns true: 変更あり, false: 変更なし
     */
    hasUpdateDate = (current: Date | null, prev: Date | null): boolean =>
        (current?.getFullYear() !== prev?.getFullYear()) ||
        (current?.getMonth() !== prev?.getMonth()) ||
        (current?.getDate() !== prev?.getDate())
}
