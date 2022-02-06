import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = environment.api;

  constructor(private http: HttpClient) { }

  public testbackend(): Observable<any> {
    console.log(this.api);
    return this.http.get(this.api + 'user');
  }
}
