import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { ResultModel } from '../models/result';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private firestore: Firestore) {}

  async addResultOfQuiz(result: ResultModel): Promise<Observable<any>> {
    result.dateAndHour = new Date();
    const docRef = await addDoc(collection(this.firestore, 'results'), result);
    const ref = doc(this.firestore, 'results', docRef.id);
    return from(setDoc(ref, result, { merge: true }));
  }

  public getResults(): Promise<ResultModel[]> {
    const dbInstance = collection(this.firestore, 'results');
    return getDocs(dbInstance).then((res) => {
      return [
        ...res.docs.map((item) => {
          return <ResultModel>{ ...item.data(), rid: item.id };
        }),
      ];
    });
  }


  deleteResult(result: ResultModel) : Observable<any>{
  const ref=doc(this.firestore,'results', <string> result?.rid);
  return from(deleteDoc(ref));
}


}
