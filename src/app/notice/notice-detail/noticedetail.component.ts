import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NoticeService} from "../../services/notice.service";
import {Notice} from "../../models/notice";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
@Component({
  selector: 'app-notice',
  templateUrl: 'noticedetail.component.html',
})
export class NoticedetailComponent implements OnInit {

  notice: Notice[];
  loading = false;
  id: number;

  private username: string;
  admin = false;

  constructor(private noticeService: NoticeService, private route: ActivatedRoute, private router: Router, private alertService: AlertService) {
    router.events.subscribe(() => {
      this.username = localStorage.getItem('username');
      if (this.username == "sweettracker") {
        this.admin = true;
      }
    });
  }

  ngOnInit() {
    this.getNotice(this.id);
  }

  // 공지사항 상세
  getNotice(id) {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.noticeService.getNotice(id).subscribe(notice => this.notice = notice);
      }
    });
  }

  // 공지사항 삭제
  delete(id){
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.noticeService.deleteNotice(id).subscribe(notice => this.notice = notice);
      }
    });
    alert('해당 공지사항을 삭제하였습니다');
    this.router.navigate(['/home']);
  }
}
