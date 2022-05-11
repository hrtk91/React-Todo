import React from 'react'
import TodoService from '../Services/TodoService'
import DatePicker from './DatePicker'

/**
 * TodoCreaterのProps型
 */
interface IProps {
    /** Todo作成成功時のコールバック関数 */
    onCreatedTodo?: () => void,
}

/**
 * TodoCreaterのState型
 */
 interface IState {
    content: string,
    dueDate: Date,
}

/**
 * Todo作成コンポーネント
 */
export default class TodoCreater extends
    React.Component<IProps, IState> {
    /** コンストラクタ */
    constructor (props: IProps) {
        super(props)
        const today = new Date()
        this.state = {
            content: '',
            dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
    }

    /** レンダリング */
    render () {
        const today = new Date()
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm'>
                        <textarea className='form-control' style={({ height: '1rem' })} onChange={this.onChangeContent}></textarea>
                    </div>
                    <div className='col-auto ps-2'>
                        <DatePicker onChange={this.onChangeDate} defaultValue={new Date(today.getFullYear(), today.getMonth(), today.getDate())}></DatePicker>
                    </div>
                    <div className='col-auto ps-2'>
                        <button type='button' className='btn btn-primary' onClick={this.createTodo}>追加</button>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Todo作成処理  
     * 成功した場合、props.onCreatedTodoを実行
     */
    createTodo = async (): Promise<void> => {
        const content = this.state.content
        const dueDate = this.state.dueDate

        try {
            await TodoService.createTodo(content, dueDate)
            this.props.onCreatedTodo?.()
        } catch (ex) {
            alert('Todoの追加処理に失敗しました。\r\n以下の入力値となっていないか確認し、もう一度やり直してください。\r\n・空白\r\n・101文字以上')
            console.log('Todoの追加処理に失敗しました。')
            console.table(ex)
        }
    }

    /**
     * テキストエリアの変更通知  
     * state.contentに反映する  
     * @param ev テキストエリアのonChangeイベント
     */
    onChangeContent = (ev: any): void => this.setState({ content: ev.target.value })

    /**
     * 予定日の変更通知  
     * state.dueDateに反映する  
     * @param newLocaleDate 新しい予定日
     */
    onChangeDate = (newLocaleDate: Date): void => this.setState({ dueDate: newLocaleDate })
}
