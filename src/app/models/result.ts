import { iQuiz } from "../services/quiz.service";

export interface ResultModel{
  rid?:string;
  quizId: string,
  uid: string,
  quiz?: iQuiz,

  //titleOfQuiz:string;
  resultOfTest:string;
  dateAndHour?:any;
}
