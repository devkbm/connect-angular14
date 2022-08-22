export class WorkGroupSchedule {
  constructor(
    public id: number = 0,
    public text: string = '',
    public start: Date = new Date(),
    public end: Date = new Date(),
    public allDay: boolean = false,
    public workGroupId: number = 0,
    public color: string = '') {};
}
