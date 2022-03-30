import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { HotToastComponent } from '@ngneat/hot-toast/lib/components/hot-toast/hot-toast.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'firebase/auth';
import { user } from 'rxfire/auth';
import { concatMap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UserService } from 'src/app/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  MOBILE_PATTERN = /[0-9\+\-\ ]/;

   user$=this.usersService.currentUserProfile$;

   profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl('',[Validators.pattern(this.MOBILE_PATTERN)]),
    hobbies: new FormControl(''),
  });


  constructor(public authService: AuthenticationService,private imageUploadService:ImageUploadService,private toast:HotToastService,private usersService:UserService) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.profileForm.patchValue({... user});
    })
  }

  uploadImage(event: any, user: ProfileUser){
    this.imageUploadService.uploadImage(event.target.files[0],`images/profile/${user.uid}`).pipe(
       this.toast.observe(
         {
          loading:'Image is being uploaded...',
          success:'Image uploaded!',
          error:'There was an error in uploading!'

         }
       ),
       concatMap((photoURL) => this.usersService.updateUser({ uid: user.uid ,photoURL }))
    ).subscribe();
  }

  saveProfile(){
    const profileData = this.profileForm.value;
    this.usersService.updateUser(profileData)
    .pipe(this.toast.observe({
      loading: 'Updating data...',
      success:' Data has been updated',
      error: 'There was an error in updating data',
    })
    ).subscribe()
  }


}
