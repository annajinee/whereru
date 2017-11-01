/**
 * Created by annakim on 2017. 2. 20..
 */

export class Static {
  constructor
  (
    public id: number,
    public comcode: string,
    public invoice: number,
    public regdate: string,
    public tiercode: string,
    public cnt: string,
    public diffpercent: number, // 미배송율 통계 -> 미배송율
    public delivery_period: string
  )
  {};

}
