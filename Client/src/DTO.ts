export interface Todo {
    id: number;
    content: string;
    dueDate: Date;
    created: Date;
    doneAt: Date | null;
}
