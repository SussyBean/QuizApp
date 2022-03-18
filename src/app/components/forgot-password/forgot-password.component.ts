import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!:FormGroup;

  constructor(private auth: AuthenticationService,private fb: FormBuilder,private toast:HotToastService,private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm=this.fb.group({
      email: new FormControl('',[Validators.required])
    })
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  forgotPassword(){

    if(!this.forgotPasswordForm){
      return;
    }


  const{email} = this.forgotPasswordForm.value;
  console.log(email);
    this.auth.sendResetEmail(email).pipe(
       this.toast.observe({
         success: 'An email for reset password is sent',
         error: 'There was an error'
       })).subscribe(() =>{
         this.router.navigate(['/confirm-password'])
       })
  }

}
