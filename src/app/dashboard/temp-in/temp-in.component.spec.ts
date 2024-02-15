import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempInComponent } from './temp-in.component';

describe('TempInComponent', () => {
  let component: TempInComponent;
  let fixture: ComponentFixture<TempInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
