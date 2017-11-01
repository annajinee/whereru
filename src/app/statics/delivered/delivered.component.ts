import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {StaticService} from "../../services/static.service";
import {Static} from "../../models/static";
import {InvoiceComcode} from "../../models/invoicecomcode";
import {InvoiceService} from "../../services/invoice.service";
import {isUndefined} from "util";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-delivered',
  templateUrl: 'delivered.component.html'
})
export class DeliveredComponent implements OnInit {

  a2edate: moment.Moment;
  a2eOptions: any;
  statics: Static[];
  invoicecomcodes: InvoiceComcode[];
  invoices_total: Array<any> = [];
  invoices_4days: Array<any> = [];
  invoices_3days: Array<any> = [];
  invoices_2days: Array<any> = [];
  invoices_1days: Array<any> = [];
  invoices_alldays: Array<any> = [];
  deliverypercent_1day: number;
  deliverypercent_2day: number;
  deliverypercent_3day: number;
  deliverypercent_4day: number;
  total: number;

  date: Array<string> = [];
  uniquedate: Array<string> = [];

  loading = false;
  comcode: string;
  datefrom: string;
  dateto: string;
  type: any;
  data: any;
  datasetiszero = false;

  private optionszero: {
    responsive: boolean; maintainAspectRatio: boolean; legend: {display: boolean; labels: {fontColor: string; fontSize: number; padding: number}}; title: {display: boolean; text: string; fontColor: string; fontSize: number};
    scales: {
      yAxes: [{
        ticks: {
          max: number,
          min: number,
          stepSize: number,
          beginAtZero: boolean;
        }
      }]
    }
  };

  private options: {
    responsive: boolean; maintainAspectRatio: boolean; legend: {display: boolean; labels: {fontColor: string; fontSize: number; padding: number}}; title: {display: boolean; text: string; fontColor: string; fontSize: number};
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: boolean;
        }
      }]
    }
  };


  constructor(protected invoiceservice: InvoiceService, private staticservice: StaticService) {
  }

  ngOnInit() {
    this.a2edate = moment();
    this.a2eOptions = {
      dayViewHeaderFormat: 'YYYY년 MM월',
      format: 'YYYY-MM-DD',
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
    this.getTrackingStaticList(this.datefrom, this.dateto, this.comcode);
  }


  getComcodes() {
    this.invoiceservice.getComcodeList()
      .subscribe(
        invoicecomcodes => this.invoicecomcodes = invoicecomcodes
      );
  }


  getTrackingStaticList(datefrom, dateto, comcode) {

    if(datefrom>dateto){
      alert("조회기간을 다시 설정 해 주세요.");
    }else {

      this.invoices_4days = [];
      this.invoices_3days = [];
      this.invoices_2days = [];
      this.invoices_1days = [];
      this.invoices_total = [];
      this.invoices_alldays = [];
      this.date = [];
      this.uniquedate = [];
      this.total = 0;
      this.loading = true;
      var start;
      this.staticservice.getTrackingDeliveryStaticList(datefrom, dateto, comcode)
        .subscribe(
          result => {
            this.statics = result;
            // alert('길이'+this.statics.length+' , rsult:'+result);
            if (this.statics.length == 0) { // 데이터가 없을 경우
              this.date.unshift('');
              this.invoices_1days.unshift(0);
              this.invoices_2days.unshift(0);
              this.invoices_3days.unshift(0);
              this.invoices_4days.unshift(0);
              this.loading = false;

            }
            else if (this.statics.length >= 1) {
              for (var i in this.statics) {
                // 1일~4일중 데이터 날짜 중복 제거 후 담기
                // if (this.date.indexOf(this.statics[i].regdate) == -1 && this.statics[i].regdate != '') {
                //   if (this.statics[i].delivery_period && this.statics[i].invoice) {
                //     this.date.push(this.statics[i].regdate);
                //   }
                // }

                if (this.statics[0].delivery_period == "4") { // 4일치 부터 시작
                  start = 4;
                } else if (this.statics[0].delivery_period == "3") { // 3일치부터 시작
                  start = 3;
                } else if (this.statics[0].delivery_period == "2") { // 2일치부터 시작
                  start = 2;
                }

                if (this.statics[i].delivery_period == "1") {
                  this.invoices_1days.push(this.statics[i].invoice);
                  this.date.push(this.statics[i].regdate);
                } else if (this.statics[i].delivery_period == "2") {
                  this.invoices_2days.push(this.statics[i].invoice);
                } else if (this.statics[i].delivery_period == "3") {
                  this.invoices_3days.push(this.statics[i].invoice);
                } else if (this.statics[i].delivery_period == "4") {
                  this.invoices_4days.push(this.statics[i].invoice);
                }

                // 총 갯수
                if (this.statics[i].invoice) {
                  this.invoices_total.push(this.statics[i].invoice);
                }
              } // for문 종료
            }
            // 그래프 밀림 방지
            if (start == 4) { // 4일치 부터 시작
              this.invoices_4days.shift();
              this.invoices_3days.shift();
              this.invoices_4days.shift();
              this.invoices_2days.shift();
              this.invoices_3days.shift();
              this.invoices_4days.shift();
            } else if (start == 3) { // 3일치부터 시작
              this.invoices_3days.shift();
              this.invoices_4days.shift();
              this.invoices_2days.shift();
              this.invoices_3days.shift();
              this.invoices_4days.shift();
            } else if (start == 2) { // 2일치부터 시작
              this.invoices_2days.shift();
              this.invoices_3days.shift();
              this.invoices_4days.shift();
            }
            // console.log('1일:' + this.invoices_1days.length + ' , 2일:' + this.invoices_2days.length + " ,3일:" + this.invoices_3days.length + ",4일" + this.invoices_4days.length);

            if (this.date.length == 1) {
              this.date.unshift('');
              this.invoices_1days.unshift(0);
              this.invoices_2days.unshift(0);
              this.invoices_3days.unshift(0);
              this.invoices_4days.unshift(0);
              this.date.push('');
              this.invoices_1days.push(0);
              this.invoices_2days.push(0);
              this.invoices_3days.push(0);
              this.invoices_4days.push(0);
            }


            var lastindex = this.date.length - 1;
            // console.log('검색일 : ' + datefrom + '~' + dateto + ' 데이터 존재 마지막 date :' + this.date[lastindex] + '첨' + this.date[0]);


            // 그래프에서 데이터가 없을경우 0으로 마무리 하기위해 1~4일 기간 중 데이터의 최대 길이 구함
            var dayslength = [this.invoices_1days.length, this.invoices_2days.length, this.invoices_3days.length, this.invoices_4days.length];

            if (this.invoices_4days.length < Math.max.apply(null, dayslength)) {
              this.invoices_4days.push(0);
            }
            if (this.invoices_3days.length < Math.max.apply(null, dayslength)) {
              this.invoices_3days.push(0);
            }
            if (this.invoices_2days.length < Math.max.apply(null, dayslength)) {
              this.invoices_2days.push(0);
            }
            if (this.invoices_1days.length < Math.max.apply(null, dayslength)) {
              this.invoices_1days.push(0);
            }
            //총 갯수
            this.total = Number(this.invoices_total.reduce(this.add, 0));
            // 등록일 +x일에 배송완료 배송률
            this.deliverypercent_1day = Math.round((Number(this.invoices_1days.reduce(this.add, 0)) / this.total) * 100);
            this.deliverypercent_2day = Math.round((Number(this.invoices_2days.reduce(this.add, 0)) / this.total) * 100);
            this.deliverypercent_3day = Math.round((Number(this.invoices_3days.reduce(this.add, 0)) / this.total) * 100);
            this.deliverypercent_4day = Math.round((Number(this.invoices_4days.reduce(this.add, 0)) / this.total) * 100);
            this.type = 'line';
            this.data = {
              labels: this.date,
              datasets: [
                {
                  label: "1일",
                  data: this.invoices_1days,
                  fill: false,
                  backgroundColor: "#ff913f",
                  borderColor: '#ff913f'
                },
                {
                  label: "2일",
                  data: this.invoices_2days,
                  fill: false,
                  backgroundColor: "#f5ca3c",
                  borderColor: '#f5ca3c'
                },
                {
                  label: "3일",
                  data: this.invoices_3days,
                  fill: false,
                  backgroundColor: "#97cd57",
                  borderColor: '#97cd57'
                },
                {
                  label: "4일 이상",
                  data: this.invoices_4days,
                  fill: false,
                  backgroundColor: "#16bcd4",
                  borderColor: '#16bcd4'
                },
              ]
            };

            if (this.date.length == 0) {

              this.datasetiszero = true;
              this.optionszero = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  display: true,
                  labels: {
                    fontColor: '#2b343a',
                    fontSize: 12,
                    padding: 15
                  }
                },
                title: {
                  display: true,
                  text: '배송율',
                  fontColor: '#2b343a',
                  fontSize: 16
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      max: 10,
                      min: 0,
                      stepSize: 1,
                      beginAtZero: true
                    }
                  }]
                }
              };

            } else {

              this.datasetiszero = false;
              this.options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                  display: true,
                  labels: {
                    fontColor: '#2b343a',
                    fontSize: 12,
                    padding: 20
                  }
                },
                title: {
                  display: true,
                  text: '배송율',
                  fontColor: '#2b343a',
                  fontSize: 16
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              };

            }
            this.loading = false;
            console.log('dataleg' + this.date.length)
          }
        );
    } // 날짜 설정 else구문 종료
  }

  public add(a, b) {
    return parseInt(a) + parseInt(b);
  }

  public getMinDate(): any {
    var datetime = new Date();
    var mindate = new Date();
    if (!this.datefrom) {
      return moment(mindate.setDate(datetime.getDate() - 100)).format('YYYY-MM-DD');
    }
  }

  public getMaxDate(): any {
    var datetime = new Date();
    var yesterday = new Date();
    if (!this.dateto) {
      return moment(yesterday.setDate(datetime.getDate() - 2)).format('YYYY-MM-DD');
    }
  }

  public getFromDate(): any {
    var datetime = new Date();
    var yesterday = new Date();
    if (!this.datefrom) {
      return moment(yesterday.setDate(datetime.getDate() - 8)).format('YYYY-MM-DD');
    }
  }

  public getToDate(): any {
    var datetime = new Date();
    var yesterday = new Date();
    if (!this.dateto) {
      return moment(yesterday.setDate(datetime.getDate() - 2)).format('YYYY-MM-DD');
    }
  }
}
