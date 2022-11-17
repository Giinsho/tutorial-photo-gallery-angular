import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
//import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public errorMessage: string;
  public showLoginForm: boolean = false;

  login: any;
  password: any;
  id: any;
  code: any;
  name: any;
  surname: any;

  constructor(
   // private authService: AuthenticationService,
    public _apiService: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    // If coming back after logging into Auth0,
    // and using CURRENT Implicit (web) Login
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndictator();
      try {
       // await this.authService.handleLoginCallback(window.location.href);
      } catch (e) {
        this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  async logInto() {
      const loadingIndicator = await this.showLoadingIndictator();
      let data = {
        login: this.login,
        password: this.password
      }
    try {
      console.log(data);
        this._apiService.logInto(data).subscribe((res: any) => {
          console.log("SUCCESS ===", res)
          let user = res['$user'];
          this.id = user.id;
          this.login = user.login;
          this.password =user.password;
          this.code = user.code;
          this.name = user.name;
          this.surname = user.surname;
          console.log("DATA: ",this.id, this.code, this.name, this.surname,this.login,this.password);
          this.router.navigateByUrl('/tabs/tab2');

        }, (error: any) => {
          console.log("ERROR ===", error)
          alert("ERROR");
        })
      } catch (e) {
        this.errorMessage = e.message;
      } finally {
        loadingIndicator.dismiss();
      }
    
  }

  async loginForm() {
    // Display loading indicator while Auth Connect login window is open
    const loadingIndicator = await this.showLoadingIndictator();
    try {
      this.showLoginForm = !this.showLoginForm;
    } catch (e) {
      console.error(e.message);
    } finally {
      loadingIndicator.dismiss();
    }
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Opening login window...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

}
