import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSolveComponent } from './quiz-solve.component';

describe('QuizSolveComponent', () => {
  let component: QuizSolveComponent;
  let fixture: ComponentFixture<QuizSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
