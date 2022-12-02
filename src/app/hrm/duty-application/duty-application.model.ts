export interface DutyApplication {
  dutyId: string;
  staffId: string;
  dutyCode: string;
	dutyReason: string;
	fromDate: Date;
	toDate: Date;
	selectedDate: DutyDate[];
	dutyTime: number;
}

export interface DutyDate {
  date: Date;
  isSelected: boolean;
  isHoliday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
}
