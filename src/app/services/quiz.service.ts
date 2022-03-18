import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { addDoc, collection, doc } from 'firebase/firestore';
import { Firestore, setDoc, getDocs } from '@angular/fire/firestore';
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
        parsedQuiz = JSON.parse(row['quiz'][0]);
      }

      catch(ex) {
        console.error("Can't parse the JSON", ex, row['quiz']);
        return [];
      }

      let questions: iQuizQestion[] = [];

      for (let i in parsedQuiz[0]) {
        let options: iQuizQestionOption[] = [];

        for (let j in parsedQuiz[0][i]['answers']) {
          options.push({
            text: parsedQuiz[0][i]['answers'][j]['answer'],
            correct: parsedQuiz[0][i]['answers'][j]['rightAnswer'],
          });
        }
        questions.push({
          questionText: parsedQuiz[0][i]['title'],
          options: options,
        });
      }

      quizes.push({
        id: row['id'],
        name: parsedQuiz[1]['titleOfQuiz'],
        description: parsedQuiz[1]['description'],
        languages: parsedQuiz[2],
        questions: questions,
      });
    }
    return quizes;
  }

  async getQuize(id: string): Promise<iQuiz | false> {
    let quizes: iQuiz[] = await this.getQuizes();

    for (let i = 0; i < quizes.length; i++) {
      const quize = quizes[i];

      if (quize.id == id) {
        return quize;
      }
    }
    return false;
  }

  async addQuiz(quiz: QuizModel): Promise<Observable<any>> {
    const docRef = await addDoc(collection(this.firestore, 'quizes'), { quiz });
    const ref = doc(this.firestore, 'quizes', docRef.id);
    return from(setDoc(ref, quiz, { merge: true }));
  }

}
