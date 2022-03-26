import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, docData, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { deleteUser } from 'firebase/auth';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from './models/user-profile';
import { AuthenticationService } from './services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usersInfo: any = [];

  get currentUserProfile$(): Observable<ProfileUser | null>{
    return this.authService.currentUser$.pipe(
      switchMap(user => {

        if(!user?.uid){
          return of(null);
        }

        const ref = doc(this.firestore,'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    )
  }

  async showAllUsers(){
     const dbInstance = collection(this.firestore,'users');
     await getDocs(dbInstance).then((response) => {
      this.usersInfo = [...response.docs.map((item) => {
        return {...item.data(),uid:item.id}
      })]
     })
  }


 async getUsersId(): Promise<ProfileUser[]>{
   await this.showAllUsers();
   let usersId: ProfileUser[]= [];
   for(let i of this.usersInfo){
     usersId.push({uid: i['uid']})
   }
   console.log(usersId);
   return usersId;
 }


  constructor(private firestore: Firestore,private authService: AuthenticationService) { }

  addUser(user: ProfileUser) : Observable<any>{
    const ref=doc(this.firestore,'users',user?.uid);
    return from(setDoc(ref,user));
  }

  // deleteUser(user: ProfileUser) : Observable<any>{
  //   const ref=doc(this.firestore,'users',user?.uid);
  //   return from(deleteDoc(ref));
  // }

  updateUser(user: ProfileUser) : Observable<any>{
    const ref=doc(this.firestore,'users',user?.uid);
    return from(updateDoc(ref,{ ...user }));
  }

}
