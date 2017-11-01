/**
 * Created by annakim on 2017. 2. 20..
 */

export class InvoiceDetail {
  constructor
  (
    public id: number,
    public invoice_id: string,
    public reg_date: string,
    public state: string,
    public time: string,
    public place: string,
    public phone_no: string,
    public phone_no2: string,
    public remark: string,
    public level: string,
    public sync_yn: string,
    public sync_date: string)
  {};

}
