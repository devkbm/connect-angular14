export class ResponseList<T> {
  constructor(
    public total: number,
    public success: boolean,
    public message: string,
    public data: Array<T>) {};
}
