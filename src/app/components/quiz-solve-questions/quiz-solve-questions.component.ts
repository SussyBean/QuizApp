import { Component, OnInit } from '@angular/core';
import { collection, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { iQuiz, QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-solve-questions',
  templateUrl: './quiz-solve-questions.component.html',
  styleUrls: ['./quiz-solve-questions.component.css']
})
export class QuizSolveQuestionsComponent implements OnInit {

  public quiz!: iQuiz | false;


  public firstQuiz : any = [];
  public questionList : any = [];


  public currentQuestion:number=0;
  public points:number=0;
  counter=60;
  correctAnswer: number = 0;
  incorrectAnswer: number =0;
  isQuizCompleted: boolean=false;
  interval$:any;
  progress:string="0";
  constructor(private quizService: QuizService,private route:ActivatedRoute) {


  }

  ngOnInit(): void {

    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions(){
    this.route.paramMap.subscribe(async (params) => {
      this.quiz = await this.quizService.getQuize(params.get('id') + "");
    });
  }

  showQuizes(){
    this.quizService.showAllQuizes();
  }

  nextQuestion(){
    this.currentQuestion++;
    this.getProgressPercent();
  }

  previousQuestion(){
   this.currentQuestion--;
   this.getProgressPercentBackwards()
  }

  answer(currentQno:number,option:any){
    console.log(this.isQuizCompleted);
    console.log(this.currentQuestion);
    if(this.quiz && currentQno === this.quiz.questions.length-1){
      this.isQuizCompleted=true;
      this.stopCounter();
    }

     if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 200);
     }else{

      setTimeout(() => {
        this.incorrectAnswer++;
        this.currentQuestion++;
         this.resetCounter();
         this.getProgressPercent();
      }, 200);
       this.points-=10;
     }
  }


  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
        this.getProgressPercent();
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe()
    }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }

  resetCounter(){
   this.stopCounter();
   this.counter=60;
   this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
    this.correctAnswer=0;
    this.incorrectAnswer=0;
  }

  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

  getProgressPercentBackwards(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
  }






}
