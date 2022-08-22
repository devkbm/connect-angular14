export class DeptChangeHistory {
  /**
   *
   * @param id 식별자
   * @param deptType 부서유형
   * @param deptCode 부서코드
   * @param fromDate 시작일
   * @param toDate 종료일
   */
  constructor(
    public id: string,
    public deptType: string,
    public deptCode: string,
    public fromDate: Date,
	  public toDate: Date) {}
}

