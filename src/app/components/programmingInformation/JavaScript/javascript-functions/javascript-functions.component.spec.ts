import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptFunctionsComponent } from './javascript-functions.component';

describe('JavascriptFunctionsComponent', () => {
  let component: JavascriptFunctionsComponent;
  let fixture: ComponentFixture<JavascriptFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavascriptFunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavascriptFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
