import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruccionPageComponent } from './construccion-page.component';

describe('ConstruccionPageComponent', () => {
  let component: ConstruccionPageComponent;
  let fixture: ComponentFixture<ConstruccionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstruccionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstruccionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
