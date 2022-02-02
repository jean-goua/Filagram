import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = environment.api;

  constructor(private http: HttpClient) { }

  public testBackend() { 
    return this.http.get(this.api);
  }
}
