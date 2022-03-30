import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs';
import { QuizModel } from 'src/app/models/quiz';
import { ResultModel } from 'src/app/models/result';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { iQuiz, QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public results: ResultModel[] = [];
  public quizesIds: QuizModel[] = [];
  public displayedColumns = ['quizName','points', 'date'];
  isLoading = true;
  isEmpty = true;

  constructor(
    private authService: AuthenticationService,
    private quizService: QuizService,
    private resultService: ResultService,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    this.resultService.getResults().then((results) => {
      this.usersService.currentUserProfile$.subscribe(
        async (res) => {
          let userResults: ResultModel[] = [];
          for (let index = 0; index < results.length; index++) {
            const result: ResultModel = results[index];

            if (result.uid == <string>res?.uid) {
              let quiz: iQuiz | false = await this.quizService.getQuize(
                result.quizId
              );
              if (quiz) {
                result.quiz = quiz;
              }

              userResults.push(result);
            }
          }

          userResults = userResults.sort((a, b) =>
            a.dateAndHour['seconds'] > b.dateAndHour['seconds'] ? -1 : 1
          );

          this.results = userResults;

          if (this.results.length != 0) {
            setTimeout(async () => {
              this.isEmpty = false;
            }, 100);
          }
          this.isLoading = false;
        },
        (err) => console.log(err),
        () => console.log('done!')
      );
    });
  }

  logOut() {
    this.authService.logout();
  }

  formatDate(date: any) {
    return new Date(date['seconds'] * 1000).toLocaleString();
  }
}
