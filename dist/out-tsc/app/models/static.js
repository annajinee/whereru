/**
 * Created by annakim on 2017. 2. 20..
 */
export var Static = (function () {
    function Static(id, comcode, invoice, regdate, tiercode, cnt, diffpercent, // 미배송율 통계 -> 미배송율
        delivery_period) {
        this.id = id;
        this.comcode = comcode;
        this.invoice = invoice;
        this.regdate = regdate;
        this.tiercode = tiercode;
        this.cnt = cnt;
        this.diffpercent = diffpercent;
        this.delivery_period = delivery_period;
    }
    ;
    return Static;
}());
//# sourceMappingURL=/Users/annakim/Desktop/Whereru/src/app/models/static.js.map