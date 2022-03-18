import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import countries from './files/countries.json';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/users.service';
import { saveAs } from 'file-saver';

export function numberOfQuestionsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isPositive = control.get('numberOfQuestions')?.value;
    if (isPositive <= 0) {
      return {
        numberOfQuestionsPositive: false,
      };
    }
    return null;
  };
}




interface Question {
  title: string;
  answers: Answer[];
}

interface Answer {
  answer: string;
 rightAnswer:boolean;
}

 export function initAnswer(answers?: Partial<Answer>): Answer {
  const defaults = {
    answer: '',
    rightAnswer:false
  };
  return {
    ...defaults,
    ...answers,
  };
}



@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  // title = 'json-file-read-angular';
  // public countryList:{name:string, code:string}[] = countries;

  user$=this.usersService.currentUserProfile$;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  titleCtrl = new FormControl('', [Validators.required]);
  numberOfQuestionsCtrl = new FormControl('', [Validators.required]);
  filteredLanguages!: Observable<string[]>;
  languages: string[] = [];
  containsInfo = false;
  isDisabled=false;
  allProgrammingLanguages: string[] = [
    'Java',
    'C#',
    'C++',
    'JavaScript'
  ];
  autoCompleteCtrl = new FormControl('', [Validators.required]);
  row = document.createElement('div');
  index=-1;

  questions: Question[] = [];

  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  createQuizForm!: FormGroup;
  createQuestionTitle!: FormGroup;
  createQuestionDetails!: FormGroup;


  ngOnInit(): void {
    this.createQuizForm = this.fb.group(
      {
        autoComplete: new FormControl('', [Validators.required]),
        titleOfQuiz: new FormControl('', [Validators.required]),
        description: new FormControl('',[Validators.required])
      },
      { validators: numberOfQuestionsValidator() }
    );



    this.createQuestionDetails = this.fb.group({
      titleOfQuestion: new FormControl('',[Validators.required]),
      optionOne: new FormControl('',[Validators.required]),
      optionTwo: new FormControl('',[Validators.required]),
      optionThree: new FormControl('',[Validators.required]),
      optionFour: new FormControl('',[Validators.required])
    });

  }

  constructor(private fb: FormBuilder, private router: Router, private el: ElementRef,private quizService: QuizService,private usersService:UserService) {
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(null),
      map((language: string | null) =>
        language ? this._filter(language) : this.allProgrammingLanguages.slice()
      )
    );
  }

  remove(language: string): void {
    const index = this.languages.indexOf(language);

    if (index >= 0) {
      this.languages.splice(index, 1);
    }

    if (this.languages.length == 0) {
      this.autoComplete?.setValue(null);
      this.autoCompleteCtrl.setValue(null);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.languages.includes(value.toLowerCase())) {
      this.languages.push(value.toLowerCase());
      this.autoComplete?.setValue(!null);
      this.autoCompleteCtrl.setValue(!null);
    }

    event.chipInput!.clear();
    this.languageCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.languages.includes(event.option.viewValue.toLowerCase())) {
      this.languages.push(event.option.viewValue.toLowerCase());
    }

    this.languageInput.nativeElement.value = '';
    this.autoCompleteCtrl.setValue(!null);
    this.autoComplete?.setValue(!null);
    this.languageCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProgrammingLanguages.filter((language) =>
      language.toLowerCase().includes(filterValue)
    );
  }

  get numberOfQuestions() {
    return this.createQuizForm.get('numberOfQuestions');
  }

  get autoComplete() {
    return this.createQuizForm.get('autoComplete');
  }

  get titleOfQuiz() {
    return this.createQuizForm.get('titleOfQuiz');
  }

  get optionOne(){
    return this.createQuestionDetails.get('optionOne');
  }

  get optionTwo(){
    return this.createQuestionDetails.get('optionTwo');
  }
  get optionThree(){
    return this.createQuestionDetails.get('optionThree');
  }
  get optionFour(){
    return this.createQuestionDetails.get('optionFour');
  }

  get titleOfQuestion(){
    return this.createQuestionDetails.get('titleOfQuestion');
  }

  get description(){
    return this.createQuizForm.get('description');
  }


  getErrorMessage() {
    return this.autoComplete?.hasError('required')
      ? 'You must enter a value'
      : '';
  }



  addNewQuestion(){
      this.questions.push({
        title: '',
        answers: [initAnswer(),initAnswer(),initAnswer(),initAnswer()],
      });
   console.log(this.questions.length);
  }



  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  saveQuiz(){

    for(let i=0; i<this.questions.length; i++){
      console.log(this.questions[i].answers[i].rightAnswer);
  }
    if (!this.createQuizForm.valid) {
      return;
    }

    // var blobQuestions = new Blob([JSON.stringify(this.questions)],{type : 'application/json'});
    // const blobQuizAdditionalInfo = new Blob([JSON.stringify(this.createQuizForm.value)],{type: 'application/json'})
    // const blobLanguages = new Blob([JSON.stringify(this.languages)],{type : 'application/json'});

    const quiz = [JSON.stringify([this.questions,this.createQuizForm.value,this.languages])];
    const quizTest = new Blob([JSON.stringify([this.questions,this.createQuizForm.value,this.languages])]);

    console.log(quiz);
    var fr = new FileReader();

    fr.onload = function(evt) {
      var res = evt.target?.result;
  };

  this.usersService.currentUserProfile$.subscribe(
    (res) => {
      var uid = res!.uid;
      this.quizService.addQuiz({uid,quiz})
    },
    (err) => console.log(err),
    () => console.log('done!')

  );

  window.location.href = "/createQuiz"


  }

}


