import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaOperatorsStatementsComponent } from './java-operators-statements.component';

describe('JavaOperatorsStatementsComponent', () => {
  let component: JavaOperatorsStatementsComponent;
  let fixture: ComponentFixture<JavaOperatorsStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaOperatorsStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaOperatorsStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
