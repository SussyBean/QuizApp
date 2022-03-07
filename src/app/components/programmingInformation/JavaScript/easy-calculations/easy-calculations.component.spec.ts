import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyCalculationsComponent } from './easy-calculations.component';

describe('EasyCalculationsComponent', () => {
  let component: EasyCalculationsComponent;
  let fixture: ComponentFixture<EasyCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyCalculationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
