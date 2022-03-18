import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  title: string = 'Programmer Bg';


 user$=this.usersService.currentUserProfile$;

  constructor(private authService: AuthenticationService,private router: Router,private observer:BreakpointObserver,private toast:HotToastService,private usersService:UserService){
  }

  onLogout(){
    this.authService.logout().pipe(
      this.toast.observe(
        {
         loading:'You are logging out...',
         success:'You logged out!',
         error:'There was an error in logging out!'

        })).subscribe (()  => {
    this.router.navigate(['/landing']);
    });
  }

  ngOnInit(): void {
  }

  toggleSidebar(){
this.toggleSidebarForMe.emit();
  }

}
