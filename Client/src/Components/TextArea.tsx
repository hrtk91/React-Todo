import React from 'react'

/**
 * TextAreaコンポーネントのProps型
 */
interface IProps {
    defaultValue?: string
    onChange?: (value: string) => void
}

/**
 * TextAreaコンポーネントのState型
 */
interface IState {
    content: string
}

/**
 * テキスト入力用コンポーネント
 */
export default class TextArea
    extends React.Component<IProps, IState> {
    /** コンストラクタ */
    constructor (props: IProps) {
        super(props)
        this.state = {
            content: ''
        }
    }

    /**
     * 初期化処理  
     * propsのdefaultValueをstate.contentに転記
     */
    componentDidMount () {
        this.setState({
            content: this.props.defaultValue ?? ''
        })
    }

    /** レンダリング */
    render () {
        return (
            <div
                className="position-relative"
                style={({
                    height: 'inherit',
                    overflow: 'auto',
                    resize: 'vertical'
                })}>
                {/* テキストエリア */}
                <textarea
                    className={`form-control ${this.state.content.length > 100 ? 'is-invalid' : ''} h-100`}
                    style={({
                        resize: 'none'
                        // boxSizing: 'border-box'
                        // height: '1rem'
                    })}
                    value={this.state.content}
                    onChange={this.onChangeContent} >
                </textarea>
                {/* テキストエリアの入力文字数表記 */}
                <div className={'position-absolute pe-none text-black-50 w-auto m-2'}
                    style={({ position: 'absolute', right: '.2rem', bottom: '0rem' })}>
                    <label>{`${this.state.content.length} / 100`}</label>
                </div>
            </div>
        )
    }

    /**
     * テキストエリアの変更通知  
     * 内容が書き換わった際、親コンポーネントに変更内容を通知する  
     * @param ev <textarea>要素のonChangeイベント
     */
    onChangeContent = (ev: any): void => {
        const value = ev.target.value
        this.setState({ content: value })
        this.props.onChange?.(value)
    }

    /**
     * テキストエリアを初期化する  
     * (デフォルトでは空文字を設定する)  
     * @param value 変更後の値
     */
    initContent = (value: string = '') => this.setState({ content: value })
}
