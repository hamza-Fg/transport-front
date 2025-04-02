import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamionsPageComponent } from './camions-page.component';

describe('CamionsPageComponent', () => {
  let component: CamionsPageComponent;
  let fixture: ComponentFixture<CamionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CamionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
