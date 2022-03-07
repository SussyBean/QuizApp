import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplicatedConditionsComponent } from './complicated-conditions.component';

describe('ComplicatedConditionsComponent', () => {
  let component: ComplicatedConditionsComponent;
  let fixture: ComponentFixture<ComplicatedConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplicatedConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplicatedConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
