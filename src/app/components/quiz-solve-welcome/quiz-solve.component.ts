import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizModel } from 'src/app/models/quiz';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { iQuiz, iQuizQestion, iQuizQestionOption, QuizService } from 'src/app/services/quiz.service';
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
  public usersId!: ProfileUser | false;
  public isLoading: boolean = true;
  public displayedColumns = ["name","description","languages", "button"];

  constructor(
    private usersService: UserService,
    private quizService: QuizService,
    public dialog: MatDialog,
    public authService:AuthenticationService
  ) {

    setTimeout(async () => {
      this.quizes = await this.quizService.getQuizes();
      this.isLoading = false;
    }, 1);
  }

  alert(msg:any) {
    console.log(msg)
  }

  getNameOfQuizCreators(){
  }

  async deleteQuiz(quiz:QuizModel){
    if (confirm( `Искате ли да изтриете ${quiz.name}?`)) {
      await this.quizService.deleteQuiz(quiz);
      this.quizes = await this.quizService.getQuizes();
    }

  }

  // confirmDelete(quiz:QuizModel): void {
  //   const message = `Сигурен ли сте,че искате да изтриете теста?`;

  //   const dialogDataConfirm = new ConfirmDialogModel("Изтрий теста", message);

  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: "400px",
  //     data: dialogDataConfirm
  //   });

  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     dialogResult = this.deleteQuiz(quiz);
  //   });
  // }

  getQuizesId(){

  }

  ngOnInit(): void {
  }

  showQuizes() {}
}
