import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User {
  username: string,
  address: string,
  authentication: string,
  email: string,
  number: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public getUser(): Observable<any> {
    return this.http.get("../../data.json");
  }

  public addUser(user): Observable<User>{
    const headers = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    }
    return this.http.post<User>("http://localhost:3000/", user, headers);
  }
}
