import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../models/invoice";
import {Router} from '@angular/router';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import {InvoiceDetail} from "../../models/invoiceDetail";
import * as moment from 'moment';
import {AlertService} from "../../services/alert.service";
import _date = moment.unitOfTime._date;
import 'eonasdan-bootstrap-datetimepicker';
import 'ng2-eonasdan-datetimepicker';
import 'moment';
import {Angular2Csv} from 'angular2-csv/Angular2-csv';
import {InvoiceComcode} from "../../models/invoicecomcode";
require('moment/locale/fr.js');


@Component({
  moduleId: module.id,
  selector: 'invoice-list',
  templateUrl: 'invoices-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InvoiceListComponent implements OnInit {

  date: moment.Moment;
  a2eOptions: any;
  invoices: Invoice[];
  filelist: Invoice[];
  invoicecomcodes: InvoiceComcode[];
  invoicesDetail: InvoiceDetail[];

  loading = false;

  // 페이징
  totalPages: number;
  totalElements: number;
  last: number;
  size: number;
  number: number;
  numberOfElements: number;
  total$: Observable<number>;
  private searchTermStream = new Subject<string>();
  page: number = 1;
  private pageStream = new Subject<number>();


  // 모달
  @ViewChild('modal')
  modal: ModalComponent;

  //////////////////////// 모달창 상세 정보 :리스트로 표현

  invoice_invoice: String; // 운송장
  invoice_itemname: String; // 상품정보
  invoice_comcodename: String; // 배송사
  invoice_recipent: string; //수령인
  invoice_sendername: string; //보내는사람
  invoice_receiverame: string; //받는사람

  /////////////////////////////////
  comcode: string;
  level: string;
  invoice: string;
  fid: string;
  datefrom: string;
  dateto: string;
  selected: string;
  output: string;
  index: number = 0;
  cssClass: string = '';
  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;
  private username: string;


  constructor(protected invoiceservice: InvoiceService, private router: Router, private alertService: AlertService) {
    router.events.subscribe(() => {
      this.username = localStorage.getItem('username');
    });

  }


  ngOnInit() {

    this.date = moment();
    this.a2eOptions = {
      dayViewHeaderFormat: 'YYYY년 MM월',
      format: 'YYYY-MM-DD HH:mm',
      locale: 'ko',
      maxDate: this.getMaxDate(),
      minDate: this.getMinDate(),
      showClose: true,
      useCurrent: false,
      tooltips: {
        today: '당일',
        clear: '선택 지우기',
        close: '창 닫기',
        selectMonth: '월 선택',
        prevMonth: '이전 달',
        nextMonth: '다음 달',
        selectYear: '년 선택',
        prevYear: '이전 년도',
        nextYear: '다음 년도',
        selectTime: '시간 선택'
      }
    };
    this.getComcodes();
    this.getInvoices(this.page, this.datefrom, this.dateto, this.comcode, this.level, this.invoice, this.fid);
  }

  public getMinDate(): any {
    var datetime = new Date();
    var mindate = new Date();

    if (!this.datefrom) {
      return moment(mindate.setDate(datetime.getDate() - 30)).format('YYYY-MM-DD');
    }
  }

  public getMaxDate(): any {
    var datetime = new Date();
    if (!this.dateto) {
      return datetime;
    }
  }

  public getFromDate(): any {
    var datetime = new Date();
    var yesterday = new Date();
    if (!this.datefrom) {
      return moment(yesterday.setDate(datetime.getDate())).format('YYYY-MM-DD 00:00');
    }
  }

  public getToDate(): any {
    var datetime = new Date();
    if (!this.dateto) {
      return moment(datetime.setDate(datetime.getDate())).format('YYYY-MM-DD hh:mm');
    }
  }

  // 페이징
  search(terms: string) {
    this.searchTermStream.next(terms)
  }

  // 모달
  closed() {
    this.output = '(closed) ' + this.selected;
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  opened() {
    this.output = '(opened)';
  }

  open() {
    this.modal.open();
  }

  getComcodes() {
    this.invoiceservice.getComcodeList()
      .subscribe(
        invoicecomcodes => this.invoicecomcodes = invoicecomcodes
      );
  }

  setfirstpage() {
    this.page = 0;
  }

  getInvoices(page, datefrom, dateto, comcode, level, invoice, fid) {

    if(datefrom>dateto){
      alert("조회기간을 다시 설정 해 주세요.");
    }else{
      this.loading = true;
      this.invoiceservice.getInvoices(page, datefrom, dateto, comcode, level, invoice, fid)
        .subscribe(
          result => {
            this.invoices = result['content'];
            this.totalPages = result['totalPages'];
            this.totalElements = result['totalElements'];
            this.last = result['last'];
            this.size = result['size'];
            this.number = result['number'];
            this.numberOfElements = result['numberOfElements'];
            this.page = result['number'];
            this.total$ = Observable.of(this.totalElements); //총 갯수
            this.loading = false;
          },
          error => {
            this.alertService.error(error, 'user');
            this.loading = false;
          });
    }

  }

  // 배송정보 상세보기
  gotoDetail(invoice: Invoice) {

    this.invoice_invoice = invoice.invoice; // 운송장
    this.invoice_comcodename = invoice.comcodename; // 배송사
    this.invoice_itemname = invoice.itemname; //상품정보
    this.invoice_sendername = invoice.sendername; // 보내는 분
    this.invoice_receiverame = invoice.receivername; // 받는 분
    this.invoice_recipent = invoice.recipent; // 수령인

    this.invoiceservice.getDetaInvoices(invoice.id)
      .subscribe(
        invoicesDetail => this.invoicesDetail = invoicesDetail
      );
    this.modal.open();
  }

  // 배송정보 다운로드
  download(datefrom, dateto, comcode, level, invoice, fid) {
    this.invoiceservice.getInvoicesdownload(datefrom, dateto, comcode, level, invoice, fid)
      .subscribe(
        result => {
          this.filelist = result;
          var data = [];

          for (var i in this.filelist) {

            var levelConvert = "";
            var regdateConvert = "";

            if (this.filelist[i].level == "1") {
              levelConvert = "배송준비";
            } else if (this.filelist[i].level == "2") {
              levelConvert = "집화완료";
            } else if (this.filelist[i].level == "3") {
              levelConvert = "배송진행중";
            } else if (this.filelist[i].level == "4") {
              levelConvert = "지점도착";
            } else if (this.filelist[i].level == "5") {
              levelConvert = "배송출발";
            } else if (this.filelist[i].level == "6") {
              levelConvert = "배송완료";
            } else if (this.filelist[i].level == "0" || this.filelist[i].level == "") {
              levelConvert = "-";
            }

            if (this.filelist[i].regdate) {
              regdateConvert = this.filelist[i].regdate.substring(0, 19);
            }

            data.push({
              '': Number(i) + 1,
              운송장번호: this.filelist[i].invoice,
              배송사: this.filelist[i].comcodename,
              배송상태: levelConvert,
              등록일: regdateConvert
            });

          }
          data.splice(data.length - 5, data.length);

          var options = {
            showLabels: true,
            showTitle: false
          };

          var timestamp = this.getDateTime();
          new Angular2Csv(data, 'tracking_list_' + timestamp, options);
        },
        error => {
          this.alertService.error(error, 'user');
          this.loading = false;
        });
  }

  public getDateTime(): string {
    var datetime = new Date();
    if (!this.dateto) {
      return moment(datetime).format('YYYYMMDDHHmmss');
    }
  }
}

