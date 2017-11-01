/**
 * Created by annakim on 2017. 2. 20..
 */
export var Invoice = (function () {
    function Invoice(id, comcode, detailcount, itemname, fid, invoice, destkindid, laststate, level, moddate, regdate, sendername, receivername, recipent, tiercode, comcodename) {
        this.id = id;
        this.comcode = comcode;
        this.detailcount = detailcount;
        this.itemname = itemname;
        this.fid = fid;
        this.invoice = invoice;
        this.destkindid = destkindid;
        this.laststate = laststate;
        this.level = level;
        this.moddate = moddate;
        this.regdate = regdate;
        this.sendername = sendername;
        this.receivername = receivername;
        this.recipent = recipent;
        this.tiercode = tiercode;
        this.comcodename = comcodename;
    }
    ;
    return Invoice;
}());
//# sourceMappingURL=/Users/annakim/Desktop/gitforanna/whereru/src/app/models/invoice.js.map