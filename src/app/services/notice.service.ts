import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Http, Response} from '@angular/http';
import {Router} from "@angular/router";
import {Notice} from "../models/notice";


/**
 * Created by annakim on 2017. 2. 20..
 */
@Injectable()
export class NoticeService {

  private url: string;

  constructor(private http: Http, private router: Router,) {
    this.url = '/api/notice';
  }

  // 공지사항
  getNoticeList(page): Observable<Notice[]> {

    return this.http.post(this.url, {page: page}, {headers: this.prepareHeaders()})
      .map(res => <Notice[]> res.json())
      .catch(this.handleError);
  }

  // 공지사항 상세보기
  getNotice(id): Observable<Notice[]> {

    return this.http.get(this.url+'/detail/'+id, {headers: this.prepareHeaders()})
      .map(res => res.json())
      .catch(this.handleError);
  }

  // 공지사항 추가
  setNotice(notice:Notice){

    return this.http.post(this.url+'/add', JSON.stringify(notice), {headers: this.prepareHeaders()})
      .catch(this.handleError);
  }

  // 공지사항 삭제
  deleteNotice(id){
    return this.http.post(this.url+'/delete', {id:id}, {headers: this.prepareHeaders()})
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

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
