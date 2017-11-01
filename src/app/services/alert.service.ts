import {Injectable} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, status: string, keepAfterNavigationChange = false) {

    var text = '';

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (status == 'login') {
      text = '아이디 또는 비밀번호가 틀립니다';
    } else if (status == 'user') {  // 사용자일 경우에 에러내용 안보여줌
      text = '에러가 발생하였습니다 관리자에게 문의해주세요';
    } else if (status == 'admin') { // 관리자일 경우에 에러내용 보여줌
      text = message;
    } else {   // 그 외
      text = '에러가 발생하였습니다 관리자에게 문의해주세요';
    }
    this.subject.next({type: 'error', text: text});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
