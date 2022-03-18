import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionCodeURL } from 'firebase/auth';
@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  mode = this.activatedActivated.snapshot.queryParams['mode'];

  constructor(private activatedActivated: ActivatedRoute) {

   }

  ngOnInit(): void {
  }

}
