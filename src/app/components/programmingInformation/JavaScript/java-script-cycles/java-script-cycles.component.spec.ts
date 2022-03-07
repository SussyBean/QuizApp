import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaScriptCyclesComponent } from './java-script-cycles.component';

describe('JavaScriptCyclesComponent', () => {
  let component: JavaScriptCyclesComponent;
  let fixture: ComponentFixture<JavaScriptCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaScriptCyclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaScriptCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
