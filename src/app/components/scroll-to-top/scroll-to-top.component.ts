import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {

  windowScrolled!: boolean;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll", [])
  @ViewChild('scroll') scroll!: ElementRef;

  scrollToTop() {
     this.scroll.nativeElement.scrollToTop=0;
  }



  ngOnInit(): void {}

}
