import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaConditionsIfStatementsComponent } from './java-conditions-if-statements.component';

describe('JavaConditionsIfStatementsComponent', () => {
  let component: JavaConditionsIfStatementsComponent;
  let fixture: ComponentFixture<JavaConditionsIfStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaConditionsIfStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaConditionsIfStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
