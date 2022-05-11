import * as DTO from '../DTO'

/**
 * Todoのモデル
 */
export default class Todo {
    /** ID */
    id: number
    /** やること */
    content: string
    /** 予定日 */
    dueDate: Date
    /** 作成日 */
    created: Date
    /** 完了日 */
    doneAt: Date | null

    /** コンストラクタ */
    constructor (id: number, content: string, dueDate: Date, created: Date, doneAt: Date | null) {
        this.id = id
        this.content = content
        this.created = created
        this.dueDate = dueDate
        this.doneAt = doneAt
    }

    /**
     * サーバーから受信したTodoのDTOをTodoモデルに変換します
     * @param dto TodoのDTO
     * @param utcToLocale 日時データをutcからLocaleに変換するか
     * @returns Todoモデル
     */
    static from (dto: DTO.ITodo, utcToLocale: boolean = true) {
        return utcToLocale
            ? new Todo(
                dto.id,
                dto.content,
                dto.dueDate.toLocaleDate(),
                dto.created.toLocaleDate(),
                dto.doneAt != null
                    ? dto.doneAt.toLocaleDate()
                    : dto.doneAt)
            : new Todo(dto.id, dto.content, dto.dueDate.toUTCDate(), dto.created.toUTCDate(), dto.doneAt?.toUTCDate() ?? null)
    }
}
