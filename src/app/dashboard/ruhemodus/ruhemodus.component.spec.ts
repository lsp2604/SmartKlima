import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuhemodusComponent } from './ruhemodus.component';

describe('RuhemodusComponent', () => {
  let component: RuhemodusComponent;
  let fixture: ComponentFixture<RuhemodusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuhemodusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RuhemodusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
