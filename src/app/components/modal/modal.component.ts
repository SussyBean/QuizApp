import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

interface Question {
  title: string;
  possibleAnswer: string[];
  addOptionalAnswer:boolean;
  rightAnswer: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})




export class ModalComponent implements OnInit {

  myform!: FormGroup;
  optionOne!: FormControl;
  optionTwo!: FormControl;

  closeResult = '';
  titleCtrl = new FormControl('', [Validators.required]);
  questions: Question[] = [];
  createQuestionFirstPairOptions!: FormGroup;


  constructor(private modalService: NgbModal,private fb: FormBuilder) { }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else {
      return `with: ${reason}`;
    }
  }


  addNewQuestion(){
    this.questions.push({
      title: '',
      addOptionalAnswer:false,
      possibleAnswer: ['','','',''],
      rightAnswer: 0,
    });
}


deleteQuestion(index: number) {
  this.questions.splice(index, 1);
}

  ngOnInit(): void {

    this.createFormControls();
    this.createForm();

    this.createQuestionFirstPairOptions = this.fb.group({
      optionOne: new FormControl('',[Validators.required]),
      optionTwo: new FormControl('',[Validators.required])
    });

  }

  createFormControls() {
    this.optionOne = new FormControl('', Validators.required);
    this.optionTwo = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        optionOne: this.optionOne,
        optionTwo: this.optionTwo,
      })
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted!");
      this.myform.reset();
    }
  }


}
