export interface WorkGroupSchedule {
  id: number;
  text: string;
  start: Date;
  end: Date;
  allDay: boolean;
  workGroupId: number;
  color: string;
}
