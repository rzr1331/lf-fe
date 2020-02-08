import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        return this.currentUserSubject.value;
    }
    
    login(userName, password) {
        return this.http.post<any>(`http://localhost:8080/account/login`, {userName, password})
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                // this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        let headers = new HttpHeaders();
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        let token = this.currentUserSubject.value.token;
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('X-LF-TOKEN', token);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.http.post<any>(`http://localhost:8080/account/logout`, {} ,{headers : headers})
            .pipe(map(user => {
                return user;
            }));    
    }
}