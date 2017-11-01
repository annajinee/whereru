import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../models/index';
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class UserService {


  private url: string;

  constructor(private http: Http, private router:Router) {
    this.url = '/api/users';

  }

    // 사용자 생성
    createUser(user: User) {
        return this.http.post(this.url+'/create', user,  {headers: this.prepareHeaders()}).catch(this.handleError);
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
