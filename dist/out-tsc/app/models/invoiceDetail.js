/**
 * Created by annakim on 2017. 2. 20..
 */
export var InvoiceDetail = (function () {
    function InvoiceDetail(id, invoice_id, reg_date, state, time, place, phone_no, phone_no2, remark, level, sync_yn, sync_date) {
        this.id = id;
        this.invoice_id = invoice_id;
        this.reg_date = reg_date;
        this.state = state;
        this.time = time;
        this.place = place;
        this.phone_no = phone_no;
        this.phone_no2 = phone_no2;
        this.remark = remark;
        this.level = level;
        this.sync_yn = sync_yn;
        this.sync_date = sync_date;
    }
    ;
    return InvoiceDetail;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/models/invoiceDetail.js.map