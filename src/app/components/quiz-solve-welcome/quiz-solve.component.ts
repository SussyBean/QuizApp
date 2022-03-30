import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizModel } from 'src/app/models/quiz';
import { ResultModel } from 'src/app/models/result';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { iQuiz, iQuizQestion, iQuizQestionOption, QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/users.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.css'],
})
export class QuizSolveComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  public quizes: iQuiz[] = [];
  public results: ResultModel []=[];
  public usersId!: ProfileUser | false;
  public isLoading: boolean = true;
  public displayedColumns = ["name","description","languages","numberOfQuestions", "button"];

  constructor(
    private usersService: UserService,
    private quizService: QuizService,
    public dialog: MatDialog,
    public authService:AuthenticationService,
    public resultService: ResultService
  ) {

    setTimeout(async () => {
      this.quizes = await this.quizService.getQuizes();
      this.isLoading = false;
    }, 1);
  }


  async deleteQuiz(quiz:QuizModel){
    if (confirm( `Искате ли да изтриете ${quiz.name}?`)) {
      let quizId: string = quiz.id + "";
      await this.quizService.deleteQuiz(quiz);
      this.quizes = await this.quizService.getQuizes();
      let results: ResultModel[] = await this.resultService.getResults();
      for (let index = 0; index < results.length; index++) {
        const result: ResultModel = results[index];

        if (result.quizId == quizId) {
          await this.resultService.deleteResult(result);
        }
      }
    }
  }


 async getQuizesId(){
    this.results = await this.resultService.getResults();
  }

  ngOnInit(): void {
    this.getQuizesId();
  }

  showQuizes() {}
}
