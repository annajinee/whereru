import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Headers, Http, Response} from '@angular/http';
import {Invoice} from "../models/invoice";
import {InvoiceDetail} from "../models/invoiceDetail";
import {Router} from "@angular/router";
import {InvoiceComcode} from "../models/invoicecomcode";
import {isNullOrUndefined} from "util";


/**
 * Created by annakim on 2017. 2. 20..
 */
@Injectable()
export class InvoiceService {

  private url: string;
  private username: string;

  constructor(private http: Http, private router: Router) {
    this.url = '/api/invoices';
    router.events.subscribe(() => {
      this.username = localStorage.getItem('username');
    });
  }

  // 배송정보 목록
  getInvoices(page, datefrom, dateto, comcode, level, invoice, fid): Observable<Invoice[]> {

    if (isNullOrUndefined(this.username)) {
      this.username = localStorage.getItem('username');
    }

    return this.http.post(this.url, {
      username: this.username,
      page: page,
      regdate_from: datefrom,
      regdate_to: dateto,
      comcode: comcode,
      level: level,
      invoice: invoice,
      fid: fid
    }, {headers: this.prepareHeaders()})
      .map(res => <Invoice[]> res.json())
      .catch(this.handleError);
  }

  // 배송정보 상세보기
  getDetaInvoices(invoice_id): Observable<InvoiceDetail[]> {

    if (isNullOrUndefined(this.username)) {
      this.username = localStorage.getItem('username');
    }

    return this.http.post(this.url + '/detail', {invoice_id: invoice_id}, {headers: this.prepareHeaders()})
      .map(res => res.json())
      .catch(this.handleError);
  }

  // 미배송정보 목록
  getInvoicesNotdelivered(page, datefrom, dateto, comcode, level, period): Observable<Invoice[]> {

    if (isNullOrUndefined(this.username)) {
      this.username = localStorage.getItem('username');
    }

    return this.http.post(this.url + '/notdelivered', {
      username: this.username,
      page: page,
      regdate_from: datefrom,
      regdate_to: dateto,
      comcode: comcode,
      level: level,
      period: period
    }, {headers: this.prepareHeaders()})
      .map(res => <Invoice[]> res.json())
      .catch(this.handleError);
  }


// 배송정보 다운로드
  getInvoicesdownload(datefrom, dateto, comcode, level, invoice, fid) {

    if (isNullOrUndefined(this.username)) {
      this.username = localStorage.getItem('username');
    }

    return this.http.post('/api/invoices/download', {
      username: this.username,
      regdate_from: datefrom,
      regdate_to: dateto,
      comcode: comcode,
      level: level,
      invoice: invoice,
      fid: fid
    }, {headers: this.prepareHeadersFile()})
      .map(res => <Invoice[]> res.json())
      .catch(this.handleError);
  }


  // 미배송정보 다운로드
  getInvoicesNotdelivereddownload(datefrom, dateto, comcode, level, period) {

    if (isNullOrUndefined(this.username)) {
      this.username = localStorage.getItem('username');
    }

    return this.http.post('/api/invoices/download/notdelivered', {
      username: this.username,
      regdate_from: datefrom,
      regdate_to: dateto,
      comcode: comcode,
      level: level,
      period: period
    }, {headers: this.prepareHeadersFile()})
      .map(res => <Invoice[]> res.json())
      .catch(this.handleError);

  }

  getComcodeList(): Observable<InvoiceComcode[]> {
    return this.http.post(this.url + '/comcode', {}, {headers: this.prepareHeaders()})
      .map(res => res.json())
      .catch(this.handleError);
  }

//////////////////////

  prepareHeaders() {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-auth-token': localStorage.getItem('currentUser')
    });
  }

  prepareHeadersFile() {
    return new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json;charset=utf-8',
      'x-auth-token': localStorage.getItem('currentUser')
    });
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
