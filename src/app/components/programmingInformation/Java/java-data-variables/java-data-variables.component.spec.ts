import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaDataVariablesComponent } from './java-data-variables.component';

describe('JavaDataVariablesComponent', () => {
  let component: JavaDataVariablesComponent;
  let fixture: ComponentFixture<JavaDataVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaDataVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaDataVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
