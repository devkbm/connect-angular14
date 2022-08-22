export class JobChangeHistory {
  /**
   *
   * @param id 식별자
   * @param jobType 인사유형
   * @param jobCode 인사코드
   * @param fromDate 시작일
   * @param toDate 종료일
   */
  constructor(
    public id: string,
    public jobType: string,
    public jobCode: string,
    public fromDate: Date,
	  public toDate: Date) {}
}

