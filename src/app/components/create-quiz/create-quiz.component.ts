import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDialogComponent, PopUpDialogModel } from '../pop-up-dialog/pop-up-dialog.component';

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
  rightAnswer: boolean;
}

export function initAnswer(answers?: Partial<Answer>): Answer {
  const defaults = {
    answer: '',
    rightAnswer: false,
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
  result: string = '';

  user$ = this.usersService.currentUserProfile$;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  titleCtrl = new FormControl('', [Validators.required]);
  numberOfQuestionsCtrl = new FormControl('', [Validators.required]);
  filteredLanguages!: Observable<string[]>;
  languages: string[] = [];
  containsInfo = false;
  isDisabled = false;
  allProgrammingLanguages: string[] = ['Java', 'C#', 'C++', 'JavaScript'];
  autoCompleteCtrl = new FormControl('', [Validators.required]);
  row = document.createElement('div');
  index = -1;
  counter=0;

  questions: Question[] = [];

  @ViewChild('languageInput') languageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  createQuestionTitle!: FormGroup;
  createQuestionDetails!: FormGroup;
  public quizForm!: FormGroup;
  public questionArrayDelete!: FormArray;

  ngOnInit(): void {
    this.quizForm = this.fb.group(
      {
        autoComplete: ['', Validators.required],
        titleOfQuiz: ['', Validators.required],
        description: ['', Validators.required],

        questions: this.fb.array([]),
      },
      { validators: numberOfQuestionsValidator() }
    );

    //this.createQuizForm.addControl

    // this.quizForm= this.fb.group({
    //   questionArray: this.fb.array([
    //     this.fb.group({
    //       titleOfQuestion: new FormControl('',[Validators.required]),
    //       optionOne: new FormControl('',[Validators.required]),
    //       optionTwo: new FormControl('',[Validators.required]),
    //       optionThree: new FormControl('',[Validators.required]),
    //       optionFour: new FormControl('',[Validators.required])
    //     })
    //   ])
    // })
  }

  // addFormControl() {
  //   let usersArray = this.quizForm.controls.questions as FormArray;
  //   let arraylen = usersArray.length;

  //   let newUsergroup: FormGroup = this.fb.group({
  //     titleOfQuestion: new FormControl('',[Validators.required]),
  //     optionOne: new FormControl('',[Validators.required]),
  //     optionTwo: new FormControl('',[Validators.required]),
  //     optionThree: new FormControl('',[Validators.required]),
  //     optionFour: new FormControl('',[Validators.required])
  //   })

  //   usersArray.insert(arraylen, newUsergroup);
  // }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private el: ElementRef,
    private quizService: QuizService,
    private usersService: UserService,
    public dialog: MatDialog
  ) {
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(null),
      map((language: string | null) =>
        language ? this._filter(language) : this.allProgrammingLanguages.slice()
      )
    );
  }

  questionControls() : FormArray {
    return this.quizForm.get("questions") as FormArray
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
    return this.quizForm.get('numberOfQuestions');
  }

  get autoComplete() {
    return this.quizForm.get('autoComplete');
  }

  get titleOfQuiz() {
    return this.quizForm.get('titleOfQuiz');
  }

  get optionOne() {
    return this.createQuestionDetails.get('optionOne');
  }

  get optionTwo() {
    return this.createQuestionDetails.get('optionTwo');
  }
  get optionThree() {
    return this.createQuestionDetails.get('optionThree');
  }
  get optionFour() {
    return this.createQuestionDetails.get('optionFour');
  }

  get titleOfQuestion() {
    return this.createQuestionDetails.get('titleOfQuestion');
  }

  get description() {
    return this.quizForm.get('description');
  }

  getErrorMessage() {
    return this.autoComplete?.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  addNewQuestion() {
    this.counter++;
    let questionsArray = this.quizForm.get("questions") as FormArray;
    this.questionArrayDelete=questionsArray;
    questionsArray.push(
      this.fb.group({
      title: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      rightAnswer:['',Validators.required]
    })

    )

  }

  deleteQuestion(i: number) {
    this.counter--;
    this.questionArrayDelete.removeAt(i);
  }

  confirmDialog(): void {
    const message = `Сигурен ли сте,че искате да запазите теста?`;
    const message2= `Тестът трябва да съдържа поне три въпроса,с избрани правилни отговори,както и необходимата допълнителна информация, за да го запазите`;

    const dialogDataConfirm = new ConfirmDialogModel("Запази теста", message);
    const dialogDataPop = new PopUpDialogModel("Внимание",message2);

    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   maxWidth: "400px",
    //   data: dialogDataConfirm
    // });

    const dialogRefPopUp = this.dialog.open(PopUpDialogComponent, {
      maxWidth: "400px",
      data: dialogDataPop
    });


    // if(this.counter<=0){
    //   dialogRefPopUp.close(true);
    //   return;
    // }
      // if (!this.quizForm.valid && this.counter==0) {
      //   dialogRef.close(false);
      // }


  }

  saveQuiz() {
    for (let i = 0; i < this.questions.length; i++) {
      console.log(this.questions[i].answers[i].rightAnswer);
    }
    console.log(this.counter);

    if (!this.quizForm.valid || this.counter<3) {
      this.confirmDialog();
      return;
    }


    let data = this.quizForm.value;

    data['languages'] = this.languages;

    const quiz = [
      JSON.stringify(data),
    ];

    console.log(quiz);
    var fr = new FileReader();

    fr.onload = function (evt) {
      var res = evt.target?.result;
    };

    this.usersService.currentUserProfile$.subscribe(
      (res) => {
        var uid = res!.uid;
        this.quizService.addQuiz({ uid, quiz });
      },
      (err) => console.log(err),
      () => console.log('done!')
    );

    setTimeout(() => {
      window.location.href = '/createQuiz';
    }, 1_000);
  }
}
