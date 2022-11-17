import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;
  constructor(
    public http: HttpClient
  ) { 
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin:', '*');
    this.headers.append('Access-Control-Allow-Methods:', '*');
    this.headers.append('Access-Control-Allow-Headers:', 'Content-Type, x-requested-with');
  }

  addUser(data) {
    return this.http.post('http://localhost/ionic_pz/backend/createUser.php', data);
  }

  logInto(data) {
    return this.http.post('http://localhost/ionic_pz/backend/login.php',data);
  }
}
