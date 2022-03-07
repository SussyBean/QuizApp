import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaArrayComponent } from './java-array.component';

describe('JavaArrayComponent', () => {
  let component: JavaArrayComponent;
  let fixture: ComponentFixture<JavaArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JavaArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
