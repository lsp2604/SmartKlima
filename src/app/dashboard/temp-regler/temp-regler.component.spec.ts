import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempReglerComponent } from './temp-regler.component';

describe('TempReglerComponent', () => {
  let component: TempReglerComponent;
  let fixture: ComponentFixture<TempReglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempReglerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempReglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
