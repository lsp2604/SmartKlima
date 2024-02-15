import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempOutComponent } from './temp-out.component';

describe('TempOutComponent', () => {
  let component: TempOutComponent;
  let fixture: ComponentFixture<TempOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TempOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
