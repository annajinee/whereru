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

@Component({
  selector: 'app-tracking',
  templateUrl: 'tracking.component.html'
})
export class TrackingComponent implements OnInit {

  a2edate: moment.Moment;
  a2eOptions: any;
  statics: Static[];
  invoicecomcodes: InvoiceComcode[];
  invoices: Array<number> = [];
  cnt: Array<string> = [];
  date: Array<string> = [];
  total_invoices: number;
  total_cnt: number;
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
    };
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

      this.invoices = [];
      this.cnt = [];
      this.date = [];
      this.loading = true;
      this.staticservice.getTrackingStaticList(datefrom, dateto, comcode)
        .subscribe(
          result => {
            this.statics = result;
            for (var i in this.statics) {
              if (this.statics[i].invoice) {
                this.invoices.push(this.statics[i].invoice);
                this.cnt.push(this.statics[i].cnt);
                this.date.push(this.statics[i].regdate);
              }
            }

            if (this.date.length == 1 && this.cnt.length == 1 && this.invoices.length == 1) {
              this.date.unshift('');
              this.cnt.unshift('0');
              this.invoices.unshift(0);
              this.date.push('');
              this.cnt.push('0');
              this.invoices.push(0);
            }

            //총 갯수
            this.total_invoices = Number(this.invoices.reduce(this.add, 0));
            this.total_cnt = Number(this.cnt.reduce(this.add, 0));

            this.type = 'line';
            this.data = {
              labels: this.date,
              datasets: [
                {
                  label: "운송장",
                  data: this.cnt,
                  fill: false,
                  position: 'bottom',
                  backgroundColor: "#ff913f",
                  borderColor: '#ff913f'
                },
                {
                  label: "전체",
                  data: this.invoices,
                  fill: false,
                  position: 'bottom',
                  backgroundColor: "#16bcd4",
                  borderColor: '#16bcd4'
                }
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
                    padding: 20
                  }
                },
                title: {
                  display: true,
                  text: '추적 건수',
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
                    padding: 15
                  }
                },
                title: {
                  display: true,
                  text: '추적 건수',
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
          });
    } // 날짜 설정 else 구문 종료
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
    if (!this.datefrom) {
      return moment(yesterday.setDate(datetime.getDate() - 1)).format('YYYY-MM-DD');
    }
  }

  public getFromDate(): any {
    var datetime = new Date();
    var yesterday = new Date();
    if (!this.datefrom) {
      return moment(yesterday.setDate(datetime.getDate() - 1)).format('YYYY-MM-DD');
    }
  }

  public getToDate(): any {
    var datetime = new Date();
    var yesterday = new Date();
    if (!this.datefrom) {
      return moment(yesterday.setDate(datetime.getDate() - 1)).format('YYYY-MM-DD');
    }
  }

  public add(a, b) {
    return parseInt(a) + parseInt(b);
  }
}
