import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage {

  login: any;
  password: any;
  code: any;
  name: any;
  surname: any;
  
  constructor(
    public _apiService: ApiService
  ) { }

  addUser() {
    console.log(this.login, this.password, this.code, this.name, this.surname);

    let data = {
      login: this.login,
      password: this.password,
      code: this.code,
      name: this.name,
      surname: this.surname,
      
    }

    this._apiService.addUser(data).subscribe((res:any) => {
      console.log("SUCCESS ===", res)
      this.login = '';
      this.password = '';
      this.code = null;
      this.name = '';
      this.surname = '';

      alert("SUCCESS");
    }, (error: any) => {
      console.log("ERROR ===", error)
      alert("ERROR");
    })

  }
}
