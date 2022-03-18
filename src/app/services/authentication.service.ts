import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword, updateProfile, UserInfo} from '@angular/fire/auth';
import { confirmPasswordReset, sendEmailVerification, verifyPasswordResetCode } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { concatMap, from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  router: any;

  constructor(private auth: Auth) { }

  currentUser$ = authState(this.auth);

  sendResetEmail(email: string){
    return from(sendPasswordResetEmail(this.auth,email));
  }

  login(username:string, password: string){
    return from(signInWithEmailAndPassword(this.auth,username,password));
  }

  logout(){
    return from(this.auth.signOut());
  }

  signup(email:string,password: string){
    return from(createUserWithEmailAndPassword(this.auth,email,password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
     const user = this.auth.currentUser;
     return of(user).pipe(
       concatMap(user =>{
        if(!user) throw new Error('Not Authenticated');
         return updateProfile(user,profileData);
       })
     )
  }


   confirmResetPassword(code: string,newPassword: string){
     return from(confirmPasswordReset(this.auth,code,newPassword));
  }


  sendEmailVerification(user: any){
    return from (sendEmailVerification(user).then((_res:any) =>{
      this.router.navigate(['/email-verify'])
    }));
  }


}





