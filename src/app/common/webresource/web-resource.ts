export class WebResource {
  constructor(
    public createdDt: Date,
    public createdBy: string,
    public modifiedDt: Date,
    public modifiedBy: string,
    public resourceCode: string,
    public resourceName: string,
    public resourceType: string,
    public url: string,
    public description: string) {}
}
