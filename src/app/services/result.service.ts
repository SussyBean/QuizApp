import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { ResultModel } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore: Firestore) {}

  async addResultOfQuiz(result: ResultModel): Promise<Observable<any>> {
    const docRef = await addDoc(collection(this.firestore, 'result'), { result });
    const ref = doc(this.firestore, 'result', docRef.id);
    return from(setDoc(ref, result, { merge: true }));
  }

}
