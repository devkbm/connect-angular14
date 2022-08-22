export class ResponseObject<T> {
  constructor(
    public total: number,
    public success: boolean,
    public message: string,
    public data: T) {}
}
