import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,private toast:HotToastService,private router: Router,private auth:AuthenticationService, private route: ActivatedRoute) { }

  forgotPasswordForm!:FormGroup;


  ngOnInit(): void {
    this.forgotPasswordForm=this.fb.group({
      newPass: new FormControl('',[Validators.required]),
      confirmNewPass: new FormControl('',[Validators.required])
    })
  }

  get newPass() {
    return this.forgotPasswordForm.get('newPass');
  }

  get confirmNewPass() {
    return this.forgotPasswordForm.get('confirmNewPass');
  }

  resetPassword(){
    console.log(this.newPass?.value);
    console.log(this.confirmNewPass?.value);

    if(this.newPass?.value !== this.confirmNewPass?.value){
      alert("The password and the confirm password should match!");
      return;
    }

    const code = this.route.snapshot.queryParams['oobCode'];

    this.auth.confirmResetPassword(code,this.newPass?.value).pipe(this.toast.observe({
      success:'Successful password reset!',
      error:'There was an error!'
    })).subscribe(() =>{
      this.router.navigate(['/login']);
    });
  }

}
