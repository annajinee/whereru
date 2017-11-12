import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Headers, Http, Response} from '@angular/http';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {Static} from "../models/static";
import {Status} from "../models/status";

/**
 * Created by annakim on 2017. 2. 20..
 */
@Injectable()
export class ProfileService {

  private url: string;
  private email: string;
  private requrl : string;
  constructor(private http: Http, private router: Router,) {

  }


  getUserdetail():Observable<User[]> {
    this.email = localStorage.getItem('email');
    console.log('getUser Service');

    return this.http.get('https://7b5a0480.ngrok.io/user?email='+localStorage.getItem('email'), {headers: this.prepareHeaders()})
        .map(res => <User[]> res.json())
        .catch(this.handleError);

  }

  getUsers():Observable<User[]> {
    this.email = localStorage.getItem('email');
    return this.http.get('https://7b5a0480.ngrok.io/user/family?email='+localStorage.getItem('email'), {headers: this.prepareHeaders()})
        .map(res => <User[]> res.json())
        .catch(this.handleError);
  }


  getStatics():Observable<Static[]> {
    console.log('getstatics');
    return this.http.get('https://7b5a0480.ngrok.io/statistic', {headers: this.prepareHeaders()})
        .map(res => <Static[]> res.json())
        .catch(this.handleError);
  }

  getStatus(id):Observable<Status[]>{
    return this.http.get('https://7b5a0480.ngrok.io/user/family?email='+localStorage.getItem('email'), {headers: this.prepareHeaders()})
        .map(res => <Static[]> res.json())
        .catch(this.handleError);
    // return this.http.get('https://7b5a0480.ngrok.io/status?fingerId='+id, {headers: this.prepareHeaders()})
    //     .map(res => <Static[]> res.json())
    //     .catch(this.handleError);
  }

// 사용자 생성
  createUser(user: User) {
    return this.http.post('https://7b5a0480.ngrok.io/user ', user,  {headers: this.prepareHeaders2()}).catch(this.handleError);
  }


//////////////////////

  prepareHeaders() {
    return new Headers({
      'Content-Type': 'application/json'
      // 'Accept': 'application/json'
      // 'x-auth-token': localStorage.getItem('currentUser')
    });
  }

  prepareHeaders2() {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // 'x-auth-token': localStorage.getItem('currentUser')
    });
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


}
