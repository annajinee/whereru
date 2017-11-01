import {Component, OnInit} from '@angular/core';
import {NoticeService} from "../../services/notice.service";
import {Notice} from "../../models/notice";
import {Route, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-notice',
  templateUrl: 'notice.component.html',
})
export class NoticeComponent implements OnInit {

  notices: Notice[];
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

  private username: string;
  admin = false;

  constructor(private noticeService: NoticeService, private router: Router, private alertService: AlertService) {
    router.events.subscribe(() => {
      this.username = localStorage.getItem('username');
      if (this.username == "sweettracker") {
        this.admin = true;
      }
    });
  }

  ngOnInit() {
    this.getNotice(this.page);
  }

  getNotice(page) {

    this.loading = true;
    this.noticeService.getNoticeList(page)
      .subscribe(
        result => {
          this.notices = result['content'];
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

  // 공지사항 상세보기
  gotoDetail(notice: Notice) {
    let link = ['/notice/detail', notice.id];
    this.router.navigate(link);
  }

  // 페이징
  search(terms: string) {
    this.searchTermStream.next(terms)
  }

}
