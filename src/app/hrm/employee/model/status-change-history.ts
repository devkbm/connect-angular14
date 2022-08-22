export class StatusChangeHistory {
  /**
   *
   * @param id 식별자
   * @param appointmentCode 발령코드
   * @param statusCode 상태코드
   * @param fromDate 시작일
   * @param toDate 종료일
   */
  constructor(
    public id: string,
    public appointmentCode: string,
    public statusCode: string,
    public fromDate: Date,
	  public toDate: Date) {}
}

