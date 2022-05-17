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
    createdDate: Date
    /** 完了日 */
    completionDate: Date | null

    /** コンストラクタ */
    constructor (id: number, content: string, dueDate: Date, createdDate: Date, completionDate: Date | null) {
        this.id = id
        this.content = content
        this.createdDate = createdDate
        this.dueDate = dueDate
        this.completionDate = completionDate
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
                dto.createdDate.toLocaleDate(),
                dto.completionDate != null
                    ? dto.completionDate.toLocaleDate()
                    : dto.completionDate)
            : new Todo(dto.id, dto.content, dto.dueDate.toUTCDate(), dto.createdDate.toUTCDate(), dto.completionDate?.toUTCDate() ?? null)
    }
}
