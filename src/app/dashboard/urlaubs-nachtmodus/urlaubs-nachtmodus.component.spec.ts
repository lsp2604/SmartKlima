import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubsNachtmodusComponent } from './urlaubs-nachtmodus.component';

describe('UrlaubsNachtmodusComponent', () => {
  let component: UrlaubsNachtmodusComponent;
  let fixture: ComponentFixture<UrlaubsNachtmodusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlaubsNachtmodusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UrlaubsNachtmodusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
