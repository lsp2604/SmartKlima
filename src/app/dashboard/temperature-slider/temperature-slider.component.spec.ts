import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureSliderComponent } from './temperature-slider.component';

describe('TemperatureSliderComponent', () => {
  let component: TemperatureSliderComponent;
  let fixture: ComponentFixture<TemperatureSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
