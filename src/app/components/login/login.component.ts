import { Component, ContentChild, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = true;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder,private authService: AuthenticationService,private router:Router,private toast:HotToastService){}


  ngOnInit():void {
    this.loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])

  });
}


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {

   if(!this.loginForm.valid){
     return;
   }



  const{email,password} = this.loginForm.value;


   this.authService.login(email,password).pipe(
     this.toast.observe({
     success:'Logged in',
     loading:'Logging in',
     error:'There was an error'
   })).subscribe(() =>{
   this.router.navigate(['/home']);
   });

  }



}

