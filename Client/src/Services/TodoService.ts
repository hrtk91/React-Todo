import Axios from '../AxiosSettings'
import * as DTO from '../DTO'
import Todo from '../Models/Todo'

/**
 * Todoサービスクラス
 */
export default class TodoService {
    /**
     * サーバーから全Todoを取得する
     * @returns すべてのTodo
     */
    static async getAllTodos (): Promise<Todo[]> {
        const dtoTodoList: DTO.Todo[] = await Axios.get('/Todo/GetAll')
            .then(res => res.data)
            .then((dtoList: DTO.ITodo[]): DTO.Todo[] => dtoList.map((dto: DTO.ITodo) => new DTO.Todo(dto)))
        const todos = dtoTodoList.map(x => Todo.from(x))
        return todos
    }

    /**
     * サーバーから未完了のTodoを取得する
     * @returns 未完了のTodo
     */
    static async getNotCompletedTodos (): Promise<Todo[]> {
        const dtoTodoList: DTO.ITodo[] = await Axios.get('/Todo/GetNotCompleted')
            .then(res => res.data)
            .then(dtoList => dtoList.map((dto: DTO.ITodo) => new DTO.Todo(dto)))
        const todos = dtoTodoList.map(x => Todo.from(x))
        return todos
    }

    /**
     * サーバーから完了しているTodoを取得する
     * @returns 完了しているTodo
     */
    static async getCompletedTodos (): Promise<Todo[]> {
        const dtoList: DTO.ITodo[] = await Axios.get('/Todo/GetCompleted')
            .then(res => res.data)
            .then(dtoList => dtoList.map((dto: DTO.ITodo) => new DTO.Todo(dto)))
        const todos = dtoList.map(x => Todo.from(x))
        return todos
    }

    /**
     * サーバーにTodoの作成をリクエストする
     * @param content Todo内容
     * @param dueDate 予定日
     */
    static async createTodo (content: string, dueDate: Date): Promise<void> {
        const dto: DTO.ITodo = {
            id: 0,
            content,
            dueDate: DTO.DateObject.fromDate(dueDate),
            createdDate: DTO.DateObject.fromDate(new Date()),
            completionDate: null
        }
        await Axios.post('/Todo/Create', dto)
    }

    /**
     * サーバーにTodoの更新をリクエストする
     * @param todo Todo
     */
    static async updateTodo (todo: Todo): Promise<void> {
        const dto: DTO.ITodo = {
            id: todo.id,
            content: todo.content,
            dueDate: DTO.DateObject.fromDate(todo.dueDate),
            createdDate: DTO.DateObject.fromDate(todo.createdDate),
            completionDate: todo.completionDate != null ? DTO.DateObject.fromDate(todo.completionDate) : null
        }
        await Axios.patch('/Todo/Update', dto)
    }

    /**
     * サーバーにTodoの削除をリクエストする
     * @param id TodoのId
     */
    static async deleteTodo (id: number): Promise<void> {
        await Axios.delete(`/Todo/Delete?id=${id}`)
    }
}
