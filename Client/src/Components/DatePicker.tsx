import React from 'react'

/**
 * DatePickerコンポーネントのProps型
 */
interface IProps {
    /** 日時変更時の通知コールバック */
    onChange?: (newLocaleDate: Date) => void | undefined,
    /** 初期値 */
    defaultValue?: Date | null,
    /** 小さめの表示にするか */
    small?: boolean,
    /** 無効化状態にするか */
    disabled?: boolean,
}

/**
 * DatePickerコンポーネントのState型
 */
 interface IState {
    /** 選択中の年(2000~2050) */
    selectedYear: number,
    /** 選択中の月(0~11) */
    selectedMonth: number,
    /** 選択中の日 */
    selectedDay: number,
    /** 年セレクタ用の配列 */
    years: number[],
    /** 月セレクタ用の配列 */
    months: number[],
    /** 日セレクタ用の配列 */
    days: number[],
    /** 年セレクタの無効化フラグ */
    disableYear: boolean,
    /** 月セレクタの無効化フラグ */
    disableMonth: boolean,
    /** 日セレクタの無効化フラグ */
    disableDay: boolean,
}

/**
 * DatePickerコンポーネント
 */
export default class DatePicker extends React.Component<IProps, IState> {
    /** コンストラクタ */
    constructor (props: IProps) {
        super(props)
        const today = (new Date())
        this.state = {
            selectedYear: today.getFullYear(),
            selectedMonth: today.getMonth(),
            selectedDay: today.getDate(),
            years: this.getYears(),
            months: this.getMonths(),
            days: this.calculateDays(today.getFullYear(), today.getMonth()),
            disableYear: false,
            disableMonth: false,
            disableDay: false
        }
    }

    /** 
     * 初期化処理  
     * セレクタの初期化と初期選択値を設定
     */
    componentDidMount () {
        const year = this.props.defaultValue?.getFullYear() ?? this.state.selectedYear
        const month = this.props.defaultValue?.getMonth() ?? this.state.selectedMonth
        const day = this.props.defaultValue?.getDate() ?? this.state.selectedDay
        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDay: day,
            days: this.calculateDays(year, month),
            disableYear: this.props.disabled ?? false,
            disableMonth: this.props.disabled ?? false,
            disableDay: this.props.disabled ?? false
        })
    }

    /** レンダラー */
    render () {
        // 今年から10年先までを入力可能日としてセレクトボックスを作成
        const yearSelectBox = this.state.years.map(year => <option key={year} value={year}>{year}</option>)

        // 1~12月までのセレクトボックスを作成
        const monthSelectBox = this.state.months.map(month => <option key={month} value={month}>{month + 1}</option>)

        // 選択月に応じた日数をセレクトボックスに設定
        const daySelectBox = this.state.days.map(day => <option key={day} value={day}>{day}</option>)

        return (
            <div>
                {/* 年セレクタ */}
                <select
                    className={`year-selectbox form-select d-inline-block w-auto ${this.props.small ? 'form-select-sm' : ''}`}
                    value={this.state.selectedYear}
                    onChange={this.onYearChange}
                    disabled={this.state.disableYear}>
                    {yearSelectBox}
                </select>
                {/* 月セレクタ */}
                <select
                    className={`month-selectbox form-select d-inline-block w-auto ${this.props.small ? 'form-select-sm' : ''}`}
                    value={this.state.selectedMonth}
                    onChange={this.onMonthChange}
                    disabled={this.state.disableMonth}>
                    {monthSelectBox}
                </select>
                {/* 日セレクタ */}
                <select
                    className={`day-selectbox form-select d-inline-block w-auto ${this.props.small ? 'form-select-sm' : ''}`}
                    value={this.state.selectedDay}
                    onChange={this.onDayChange}
                    disabled={this.state.disableDay}>
                    {daySelectBox}
                </select>
            </div>
        )
    }

    /**
     * 年セレクタの選択値生成用メソッド
     * @returns 2000~2050までの配列
     */
    getYears = (): number[] => {
        return [...Array(51)].map((_, idx) => 2000 + idx)
    }

    /**
     * 月セレクタの選択値生成用メソッド
     * @returns 0~11までの配列
     */
    getMonths = (): number[] =>
        [...Array(12)].map((_, month) => month)

    /**
     * 日セレクタの選択値生成用メソッド
     * @returns 年月にあわせた1~31の配列
     */
    calculateDays = (year: number, month: number): number[] => {
        // yearとmonthに応じたその月の日数を計算
        // 12月の場合、13月0日はないので1月0日(12月末日)を取得
        const dayNum = month === 11
            ? (new Date(year, 1, 0)).getDate()
            : (new Date(year, month + 1, 0)).getDate()
        return [...Array(dayNum)].map((_, day) => day + 1)
    }

    /**
     * 年セレクタの変更通知  
     * 以下の処理を実施する  
     * ・選択中年月日の更新  
     * ・日セレクタの選択肢の再計算  
     * ・onChangeコールバックの呼び出し  
     * @param ev <select>要素のonChangeイベント
     */
    onYearChange = (ev: any): void => {
        const year = Number.parseInt(ev.target.value)
        this.setState({
            selectedYear: year,
            selectedMonth: 0,
            selectedDay: 1,
            days: this.calculateDays(year, 0),
            disableMonth: false,
            disableDay: false
        })

        this.props.onChange?.(new Date(year, 0, 1))
    }

    /**
     * 月セレクタの変更通知  
     * 以下の処理を実施する  
     * ・選択中月日の更新  
     * ・日セレクタの選択肢の再計算  
     * ・onChangeコールバックの呼び出し  
     * @param ev <select>要素のonChangeイベント
     */
    onMonthChange = (ev: any): void => {
        const month = Number.parseInt(ev.target.value)
        this.setState({
            selectedMonth: month,
            selectedDay: 1,
            days: this.calculateDays(this.state.selectedYear, month),
            disableDay: false
        })
        this.props.onChange?.(new Date(this.state.selectedYear, month, 1))
    }

    /**
     * 日セレクタの変更通知  
     * 以下の処理を実施する  
     * ・選択中日の更新  
     * ・onChangeコールバックの呼び出し  
     * @param ev <select>要素のonChangeイベント
     */
    onDayChange = (ev: any): void => {
        const day = Number.parseInt(ev.target.value)
        this.setState({
            selectedDay: day
        })
        this.props.onChange?.(new Date(this.state.selectedYear, this.state.selectedMonth, day))
    }
}
