import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSolveQuestionsComponent } from './quiz-solve-questions.component';

describe('QuizSolveQuestionsComponent', () => {
  let component: QuizSolveQuestionsComponent;
  let fixture: ComponentFixture<QuizSolveQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSolveQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSolveQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
