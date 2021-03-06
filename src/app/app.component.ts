import { Component, ElementRef, HostListener, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import { HotToastService } from '@ngneat/hot-toast';
// import countries from './files/countries.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sideBarOpen=true;
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav

  constructor(public authService: AuthenticationService,private router: Router,private toast:HotToastService,private el: ElementRef, private renderer:Renderer2){
  }


  ngAfterViewInit(){
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'red', 'red');
  }

  sideBarToggler(){
    this.sideBarOpen=!this.sideBarOpen;
  }

  disableLoginButton(){
  }


}
