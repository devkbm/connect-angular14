export class TodoModel {
  constructor(
    public pkTodoGroup: string,
    public pkTodo: string,
    public isCompleted: boolean,
    public todo: string) {}
}
