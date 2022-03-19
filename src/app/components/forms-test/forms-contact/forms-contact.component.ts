import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms-contact',
  templateUrl: './forms-contact.component.html',
  styleUrls: ['./forms-contact.component.css']
})
export class FormsContactComponent{

  public childForm!: FormGroup;

  constructor() { }

  static addUserContactItem () : FormGroup {
    return new FormGroup({

    })
  }


}
