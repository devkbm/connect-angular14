export class Board {
  constructor(
    public pkBoard: number,
    public ppkBoard: number,
    public boardType: string,
    public boardName: string,
    public boardDescription: string,
    public useYn: string,
    public articleCount: number,
    public sequence: number,
    public pwdYn: string) {}
}
