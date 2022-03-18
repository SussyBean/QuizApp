import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/users.service';


export function passwordsMatchValidator():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

     const password = control.get('password')?.value;
     const confirmPassword = control.get('confirmPassword')?.value;

     if(password && confirmPassword && password !== confirmPassword){
      return{
        passwordsDontMatch: true
      }
     }
     return null;
    };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public showPassword: boolean = true;
  public showPasswordConfirm: boolean = true;
  code = this.activateRoute.snapshot.queryParams['oobCode'];



  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public togglePasswordConfirmVisibility():void{
    this.showPasswordConfirm= !this.showPasswordConfirm;
  }

  registerForm!: FormGroup;
  firebaseErrorMessage!: string;


  constructor(private fb: FormBuilder, private router: Router, private afAuth: Auth,private authService: AuthenticationService,private toast:HotToastService,private usersService:UserService,private activateRoute: ActivatedRoute) {

    this.firebaseErrorMessage = '';

    this.registerForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', Validators.required),
    firstName: new FormControl('',Validators.required)

  }, { validators: passwordsMatchValidator() })
}

  ngOnInit(): void {}

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get firstName(){
    return this.registerForm.get('firstName');
  }

  submit(){
    if(!this.registerForm.valid){
      return;
    }

    const{firstName,email,password} = this.registerForm.value;
    this.authService.signup(email,password).pipe(
      switchMap(({user : {uid}}) => this.usersService.addUser({uid,email,displayName:firstName}))
    ).pipe(
      this.toast.observe({
        success:'You successfully signed up!',
        loading:'You are signing in...',
        error: ({message}) => `${message}`
      })
    )
    .subscribe(() =>{
      this.router.navigate(['/home']);

    })
  }

  // emailVerify(){
  //   this.authService.sendEmailVerification(this.authService.currentUser$).pipe(this.toast.observe({
  //     success:'Successful password reset!',
  //     error:'There was an error!'
  //   })).subscribe()
  // }

}
