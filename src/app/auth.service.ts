import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getUser(): Observable<any> {
    return this.http.get("../assets/data.json");
  }

  public addUser(body){
    return this.http.post("../assets/data.json",body);
  }
}
