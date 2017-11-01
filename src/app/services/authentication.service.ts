import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }


  login(username, password): Observable<Response> {
    let loginRequest = JSON.stringify({username: username, password: password});
    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});

    var name;

    this.loadusername(username)
      .subscribe(
        result => {
          name = result;
          localStorage.setItem('name', name); //사용자 명 담기
        }
      );

    return this.http.post('/api/login', loginRequest, {headers: headers})
      .do(resp => {
        localStorage.setItem('currentUser', resp.headers.get('x-auth-token'));
        localStorage.setItem('username', username);
      });
  }

  loadusername(username): Observable<Response> {

    let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});

    return this.http.post('/api/users/loadbyuser', {username: username}, {headers: headers})
      .map(res => res.text())
      .catch(this.handleError);
  }


  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('name');
    localStorage.clear();
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


  isSignedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }


}
