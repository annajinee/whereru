/**
 * Created by annakim on 2017. 2. 20..
 */
"use strict";
var Invoice = (function () {
    function Invoice(id, comcode, detailcount, content, fid, invoice, destkindid, laststate, level, moddate, regdate, tiercode) {
        this.id = id;
        this.comcode = comcode;
        this.detailcount = detailcount;
        this.content = content;
        this.fid = fid;
        this.invoice = invoice;
        this.destkindid = destkindid;
        this.laststate = laststate;
        this.level = level;
        this.moddate = moddate;
        this.regdate = regdate;
        this.tiercode = tiercode;
    }
    ;
    return Invoice;
}());
exports.Invoice = Invoice;
// id: number;
// comcode: string;
// detailcount: string;
// content: string;
// fid: string;
// invoice: string;
// destkindid: string;
// laststate: string;
// level: string;
// moddate: string;
// regdate: string;
// tiercode: string;
