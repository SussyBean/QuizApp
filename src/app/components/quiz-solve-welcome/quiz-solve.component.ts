import { Component, OnInit } from '@angular/core';
import { ProfileUser } from 'src/app/models/user-profile';
import { iQuiz, iQuizQestion, iQuizQestionOption, QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/users.service';



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
    private quizService: QuizService
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

  getQuizesId(){

  }

  ngOnInit(): void {
  }

  showQuizes() {}
}
