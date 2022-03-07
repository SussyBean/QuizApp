import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaCyclesComponent } from './java-cycles.component';

describe('JavaCyclesComponent', () => {
  let component: JavaCyclesComponent;
  let fixture: ComponentFixture<JavaCyclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaCyclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
