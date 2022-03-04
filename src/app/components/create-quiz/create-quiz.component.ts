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
  possibleAnswer: string[];
  addOptionalAnswer:boolean;
  rightAnswer: number;
}


@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
})
export class CreateQuizComponent implements OnInit {
  // title = 'json-file-read-angular';
  // public countryList:{name:string, code:string}[] = countries;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  titleCtrl = new FormControl('', [Validators.required]);
  numberOfQuestionsCtrl = new FormControl('', [Validators.required]);
  filteredLanguages!: Observable<string[]>;
  languages: string[] = [];
  additionalInfoQuiz: string [] =[];
  allProgrammingLanguages: string[] = [
    'Java',
    'C#',
    'C++',
    'Python',
    'JavaScript',
  ];
  autoCompleteCtrl = new FormControl('', [Validators.required]);
  row = document.createElement('div');

  questions: Question[] = [];

  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  createQuizForm!: FormGroup;
  createQuestionTitle!: FormGroup;
  createQuestionFirstPairOptions!: FormGroup;
  createQuestionSecondPairOptions!: FormGroup;


  ngOnInit(): void {
    this.createQuizForm = this.fb.group(
      {
        autoComplete: new FormControl('', [Validators.required]),
        titleOfQuiz: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      },
      { validators: numberOfQuestionsValidator() }
    );

    this.createQuestionFirstPairOptions = this.fb.group({
      optionOne: new FormControl('',[Validators.required]),
      optionTwo: new FormControl('',[Validators.required])
    });


    this.createQuestionSecondPairOptions = this.fb.group({
      optionThree: new FormControl('',[Validators.required]),
      optionFour: new FormControl('',[Validators.required])
    });

  }

  constructor(private fb: FormBuilder, private router: Router, private el: ElementRef) {
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

  get description() {
    return this.createQuizForm.get('description');
  }

  get autoComplete() {
    return this.createQuizForm.get('autoComplete');
  }

  get titleOfQuiz() {
    return this.createQuizForm.get('titleOfQuiz');
  }

  get optionOne(){
    return this.createQuestionFirstPairOptions.get('optionOne');
  }

  get optionTwo(){
    return this.createQuestionFirstPairOptions.get('optionTwo');
  }
  get optionThree(){
    return this.createQuestionSecondPairOptions.get('optionThree');
  }
  get optionFour(){
    return this.createQuestionSecondPairOptions.get('optionFour');
  }


  getErrorMessage() {
    return this.autoComplete?.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  saveQuestion(){
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

  saveQuiz(){
    if (!this.createQuizForm.valid) {
      return;
    }

    if(!this.titleCtrl.valid){
      return;
    }

    if(!this.createQuestionFirstPairOptions.valid){
      return;
    }

    if(!this.createQuestionSecondPairOptions.valid){
      return;
    }

    const blobQuestions = new Blob([JSON.stringify(this.questions)],{type : 'application/json'});
    const blobLanguages = new Blob([JSON.stringify(this.languages)],{type : 'application/json'});
    // const blob = new Blob({questions:this.questions,languages:this})
    saveAs(blobQuestions, 'abc.json');
  }

}


