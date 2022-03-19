import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormsContactComponent } from './forms-contact/forms-contact.component';

@Component({
  selector: 'app-forms-test',
  templateUrl: './forms-test.component.html',
  styleUrls: ['./forms-test.component.css']
})
export class FormsTestComponent implements OnInit {


  public quizForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.generateQuestionForm();
  }

  public generateQuestionForm(): void{
     this.quizForm = new FormGroup({
        questions: new FormArray([
          FormsContactComponent.addUserContactItem()
        ])
     })
  }

  public submitQuizFormValid() : void{
    console.log(this.quizForm.value);
  }




}
