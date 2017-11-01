import {Component, OnInit, Input} from '@angular/core';
import {NoticeService} from "../../services/notice.service";
import {Notice} from "../../models/notice";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-notice',
  templateUrl: 'noticeadd.component.html',
})
export class NoticeaddComponent implements OnInit {

  @Input() notice: Notice;
  model: any = {};
  loading = false;

  constructor(private noticeService: NoticeService, private router: Router, private alertService:AlertService) { }

  ngOnInit() {
  }

  setNotice() {
    this.loading = true
    this.noticeService.setNotice(this.model)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error, 'admin');
          this.loading = false;
        });
  }

}
