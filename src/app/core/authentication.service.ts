import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {URL} from '../../environments/environment';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userSubject: BehaviorSubject<any>;
  private _user: Observable<any>;

  constructor(private _http: HttpClient) {
    this._userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this._user = this._userSubject.asObservable();
  }

  public get currentUser(): any {
    return this._userSubject.value;
  }

  public async login(email: string, password: string) {
    const response = await this._http.post(`${URL}/api/users/login`, {user: {email, password}})
      .pipe(first())
      .toPromise();
    const {user}: any = response;
    if (user && user.token) {
      localStorage.setItem('user', JSON.stringify(user));
      this._userSubject.next(user);
    }
    return user;
  }

}
