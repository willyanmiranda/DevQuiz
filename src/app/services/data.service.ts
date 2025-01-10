import { Injectable, WritableSignal, signal } from '@angular/core';
import { Quizz } from '../models/question.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/';

  private data: Quizz[] = [];

  private step = signal(0);

  private quizz: WritableSignal<Quizz> = signal({} as Quizz);

  private testFinished = signal(false);

  constructor(private http: HttpClient) {};

  fetchDataAndSetData(): void {
    console.log('chamou')
    console.log(this.data)
    this.http.get<Quizz[]>(this.apiUrl).subscribe({
      next: (quizzes) => {
        console.log(quizzes)
        this.data = quizzes;
      },
      error: (err) => {
        console.error('Erro ao buscar os dados:', err);
      }
    });
    console.log('....')
    console.log(this.data)
  }  

  getTestFinished(): WritableSignal<boolean> {
    return this.testFinished;
  }

  setTestFinished(): void {
    this.testFinished.update(value => !value);
  }

  getData(): Quizz[] {
    return this.data;
  }

  getStep(): WritableSignal<number> {
    return this.step;
  }

  addStep(): void {
    this.step.update(value => value + 1);
  }

  getQuizz(): WritableSignal<Quizz> {
    return this.quizz;
  }

  setQuizz(idx: number) {
    this.quizz.set(this.data[idx]);
  }

  initializeData(): void {
    this.step.set(0);
    this.testFinished.set(false);
    this.quizz.set({} as Quizz);
  }

}
