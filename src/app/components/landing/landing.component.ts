import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { LoginData } from 'src/app/interfaces/login-data.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  authService: any;
  router: any;

  constructor(public afAuth: Auth) { }

  ngOnInit(): void {
  }

  logout(): void{
   this.afAuth.signOut();
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      .then(() => this.router.navigate(['/home']))
      .catch((e: { message: any; }) => console.log(e.message));
  }

}
