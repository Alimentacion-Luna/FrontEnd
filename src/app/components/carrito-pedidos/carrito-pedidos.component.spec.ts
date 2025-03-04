import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoPedidosComponent } from './carrito-pedidos.component';

describe('CarritoPedidosComponent', () => {
  let component: CarritoPedidosComponent;
  let fixture: ComponentFixture<CarritoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
