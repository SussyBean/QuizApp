import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Firestore, setDoc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { QuizModel } from '../models/quiz';

export interface iQuizQestionOption {
  text: string;
  correct: boolean;
}
export interface iQuizQestion {
  questionText: string;
  options: iQuizQestionOption[];
}
export interface iQuiz {
  id: string;
  name: string;
  description: string;
  languages: string[];
  questions: iQuizQestion[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public data: any = [];
  public titleOfQuiz!: string;
  public quizesId: any = [];

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getQuizJson() {
    return this.http.get<any>('assets/quizJson/Angular_Typescript.json');
  }

  async showAllQuizes() {
    const dbInstance = collection(this.firestore, 'quizes');
    await getDocs(dbInstance).then((res) => {
      this.data = [
        ...res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        }),
      ];
    });
  }

  async getQuizes(): Promise<iQuiz[]> {
    await this.showAllQuizes();

    let quizes: iQuiz[] = [];

    for (let row of this.data) {
      let parsedQuiz;

      try {
        parsedQuiz = JSON.parse(row['quiz']);
      } catch (ex) {
        console.error("Caan't parse the JSON", ex, row['quiz']);
        return [];
      }
      console.log(parsedQuiz);

      let questions: iQuizQestion[] = [];

      for (let i in parsedQuiz['questions']) {
        let options: iQuizQestionOption[] = [];

        options.push(
          {
            text: parsedQuiz['questions'][i]['option1'],
            correct: parsedQuiz['questions'][i]['rightAnswer'] == 'option1',
          },
          {
            text: parsedQuiz['questions'][i]['option2'],
            correct: parsedQuiz['questions'][i]['rightAnswer'] == 'option2',
          },
          {
            text: parsedQuiz['questions'][i]['option3'],
            correct: parsedQuiz['questions'][i]['rightAnswer'] == 'option3',
          },
          {
            text: parsedQuiz['questions'][i]['option4'],
            correct: parsedQuiz['questions'][i]['rightAnswer'] == 'option4',
          }
        );


        questions.push({
          questionText: parsedQuiz['questions'][i]['title'],
          options: options,
        });
      }

      quizes.push({
        id: row['id'],
        name: parsedQuiz['titleOfQuiz'],
        description: parsedQuiz['description'],
        languages: parsedQuiz['languages'],
        questions: questions,
      });
    }

    console.log(quizes);
    return quizes;
  }

  async getQuize(id: string): Promise<iQuiz | false> {
    let quizes: iQuiz[] = await this.getQuizes();

    for (let i = 0; i < quizes.length; i++) {
      const quize = quizes[i];
      this.titleOfQuiz = quizes[i].name;
      if (quize.id == id) {
        return quize;
      }
    }
    return false;
  }

  async getQuizesInfo(){
    let quizes: iQuiz[] = await this.getQuizes();
    for(let j=0;j<quizes.length;j++){
      this.quizesId[j]=quizes[j].name;
    }
    return this.quizesId;
  }


  async addQuiz(quiz: QuizModel): Promise<Observable<any>> {
    const docRef = await addDoc(collection(this.firestore, 'quizes'), { quiz });
    const ref = doc(this.firestore, 'quizes', docRef.id);
    return from(setDoc(ref, quiz, { merge: true }));
  }

   deleteQuiz(quiz: QuizModel) : Observable<any>{
      console.log(`Delete quiz ${quiz.id}`);
    const ref=doc(this.firestore,'quizes', <string> quiz?.id);
    return from(deleteDoc(ref));
  }

}
