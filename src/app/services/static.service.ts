import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Headers, Http, Response} from '@angular/http';
import {Static} from "../models/static";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";


/**
 * Created by annakim on 2017. 2. 20..
 */
@Injectable()
export class StaticService {

  private url: string;
  private username : string;

  constructor(private http: Http, private router:Router) {
    this.url = '/api/static';
    router.events.subscribe(() => {
      this.username = localStorage.getItem('username');
    });
  }

  // 추적건수통계
  getTrackingStaticList(datefrom, dateto, comcode):Observable<Static[]> {

    if(isNullOrUndefined(this.username)){
      this.username = localStorage.getItem('username');
    }

    return this.http.post(this.url+'/tracking', {username: this.username, regdate_from: datefrom, regdate_to: dateto, comcode: comcode}, {headers: this.prepareHeaders()})
      .map(res => res.json())
      .catch(this.handleError);
  }

  // 미배송건수통계
  getTrackingNotDeliveredList(datefrom, dateto, comcode):Observable<Static[]> {

    if(isNullOrUndefined(this.username)){
      this.username = localStorage.getItem('username');
    }

    return this.http.post(this.url + '/notdelivered', {
      username: this.username,
      regdate_from: datefrom,
      regdate_to: dateto,
      comcode: comcode
    }, {headers: this.prepareHeaders()})
      .map(res => res.json())
      .catch(this.handleError);
  }

  // 배송율통계
  getTrackingDeliveryStaticList(datefrom, dateto, comcode):Observable<Static[]> {

    if(isNullOrUndefined(this.username)){
      this.username = localStorage.getItem('username');
    }

    this.username = localStorage.getItem('username');
    return this.http.post(this.url+'/delivered', {username: this.username, regdate_from: datefrom, regdate_to: dateto, comcode: comcode}, {headers: this.prepareHeaders()})
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

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
