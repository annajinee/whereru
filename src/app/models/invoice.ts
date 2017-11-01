/**
 * Created by annakim on 2017. 2. 20..
 */

export class Invoice {
  constructor
  (
    public id: number,
    public comcode: string,
    public detailcount: string,
    public itemname: string,
    public fid: string,
    public invoice: string,
    public destkindid: string,
    public laststate: string,
    public level: string,
    public moddate: string,
    public regdate: string,
    public sendername: string,
    public receivername: string,
    public recipent: string,
    public tiercode: string,
    public comcodename: string
  )
  {};

}
