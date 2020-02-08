import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user';

@Injectable({ providedIn: 'root' })
export class UserdataService {
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
    
    submit(url, meta) {
        let headers = new HttpHeaders();
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        let token = this.currentUserSubject.value.token;
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('X-LF-TOKEN', token);
        return this.http.post<any>(`http://localhost:8080/user/data/url/submit`, {url, meta}, {headers : headers})
            .pipe(map(data => {
                // console.log(data)
                return data;
            }));
    }

    display() {
        let headers = new HttpHeaders();
        let token = this.currentUserSubject.value.token;
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('X-LF-TOKEN', token);
        return this.http.get<any>(`http://localhost:8080/user/data/url`, {headers : headers})
            .pipe(map(data => {
                // console.log(data)
                return data;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}