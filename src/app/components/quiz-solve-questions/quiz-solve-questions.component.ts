import { Component, OnInit } from '@angular/core';
import { FirebaseApp, FirebaseAppModule } from '@angular/fire/app';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from 'firebase/firestore';
import { interval } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { iQuiz, QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-quiz-solve-questions',
  templateUrl: './quiz-solve-questions.component.html',
  styleUrls: ['./quiz-solve-questions.component.css'],
})
export class QuizSolveQuestionsComponent implements OnInit {
  public quiz!: iQuiz | false;

  public firstQuiz: any = [];
  public questionList: any = [];

  public currentQuestion: number = 0;
  public getTitleOfQuiz!: string;
  public points: number = 0;
  public maxPoints!: number;
  counter = 60;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  isQuizCompleted: boolean = false;
  interval$: any;
  progress: string = '0';
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private usersService: UserService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.route.paramMap.subscribe(async (params) => {
      this.quiz = await this.quizService.getQuize(params.get('id') + '');

      if(this.quiz){
        this.maxPoints=this.quiz.questions.length*10;
      }

      this.getTitleOfQuiz = await this.quizService.titleOfQuiz;
    });
  }

  showQuizes() {
    this.quizService.showAllQuizes();
  }

  nextQuestion() {
    this.currentQuestion++;
    this.getProgressPercent();
  }

  previousQuestion() {
    this.currentQuestion--;
    this.getProgressPercentBackwards();
  }

  answer(currentQno: number, option: any) {

    if (this.quiz && currentQno === this.quiz.questions.length - 1) {
      setTimeout(async () => {

        this.isQuizCompleted = true;
        this.getTitleOfQuiz = this.quizService.titleOfQuiz;
        this.points;

        await this.resultService.addResultOfQuiz({
          quizId: (<iQuiz>this.quiz).id,
          uid: <string> this.authenticationService.getCurrentUserUid(),
          resultOfTest:""+this.points +"/"+ this.maxPoints,
        });
        this.stopCounter();
      }, 300);
    }

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 200);
    } else {
      setTimeout(() => {
        this.incorrectAnswer++;
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 200);
      this.points += 0;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points += 0;
        this.getProgressPercent();
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
  }

  getProgressPercent() {
    if (this.quiz)
      this.progress = (
        (this.currentQuestion / this.quiz.questions.length) *
        100
      ).toString();
    return this.progress;
  }

  getProgressPercentBackwards() {
    if (this.quiz)
      this.progress = (
        (this.currentQuestion / this.quiz.questions.length) *
        100
      ).toString();
  }
}
