/**
 * サーバーと日時データをやり取りする際のDTOインターフェース
 * (サーバーから受信したデータはJSONとなるため、クラスと分けた)
 */
export interface IDateObject {
    /** 年(西暦) */
    year: number
    /** 月(1~12) */
    month: number
    /** 日 */
    day: number
    /** 時 */
    hour: number
    /** 分 */
    minute: number
    /** 秒 */
    second: number
    /** ミリ秒 */
    milliSecond: number
}

/**
 * サーバーとやり取りする際のDTOクラス
 * (サーバーから受信したデータはJSONとなるため、インターフェースと分けた)
 */
export class DateObject implements IDateObject {
    /** 年(西暦) */
    year: number
    /** 月(1~12) */
    month: number
    /** 日 */
    day: number
    /** 時 */
    hour: number
    /** 分 */
    minute: number
    /** 秒 */
    second: number
    /** ミリ秒 */
    milliSecond: number

    /** コンストラクタ */
    constructor (data: IDateObject) {
        this.year = data.year
        this.month = data.month
        this.day = data.day
        this.hour = data.hour
        this.minute = data.minute
        this.second = data.second
        this.milliSecond = data.milliSecond
    }

    /**
     * サーバーからの受信データをJS標準Date型(UTC時刻)に変換
     * @returns JS標準のDate型(UTC時刻)
     */
    toUTCDate (): Date {
        return new Date(
            Date.UTC(
                this.year,
                this.month - 1,
                this.day,
                this.hour,
                this.minute,
                this.second,
                this.milliSecond
            )
        )
    }

    /**
     * サーバーからの受信データをJS標準Date型(Locale時刻)に変換
     * @returns JS標準のDate型(Locale時刻)
     */
    toLocaleDate (): Date {
        return new Date(this.toUTCDate().getTime())
    }

    /**
     * JS標準Date型からサーバーとやり取りするDTO(UTC時刻)のDateObjectに変換
     * @param date JS標準Date型
     * @returns DTO
     */
    static fromDate (date: Date): DateObject {
        return new DateObject({
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate(),
            hour: date.getUTCHours(),
            minute: date.getUTCMinutes(),
            second: date.getUTCSeconds(),
            milliSecond: date.getUTCMilliseconds()
        })
    }
}

/**
 * サーバーとTodoをやり取りする際のDTOインターフェース
 * (サーバーから受信したデータはJSONとなるため、クラスと分けた)
 */
export interface ITodo {
    /** ID */
    id: number
    /** Todo内容 */
    content: string
    /** 予定日 */
    dueDate: DateObject
    /** 作成日 */
    createdDate: DateObject
    /** 完了日 */
    completionDate: DateObject | null
}

/**
 * サーバーとTodoをやり取りする際のDTOインターフェース
 * (サーバーから受信したデータはJSONとなるため、インターフェースと分けた)
 */
export class Todo implements ITodo {
    /** ID */
    id: number
    /** Todo内容 */
    content: string
    /** 予定日 */
    dueDate: DateObject
    /** 作成日 */
    createdDate: DateObject
    /** 完了日 */
    completionDate: DateObject | null

    /** コンストラクタ */
    constructor (data: ITodo) {
        this.id = data.id
        this.content = data.content

        // interfaceからclassに変換
        this.dueDate = new DateObject(data.dueDate)

        // interfaceからclassに変換
        this.createdDate = new DateObject(data.createdDate)

        // interfaceからclassに変換
        this.completionDate = data.completionDate != null ? new DateObject(data.completionDate) : null
    }
}
