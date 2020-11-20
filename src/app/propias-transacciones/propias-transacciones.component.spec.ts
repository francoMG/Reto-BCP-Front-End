import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiasTransaccionesComponent } from './propias-transacciones.component';

describe('PropiasTransaccionesComponent', () => {
  let component: PropiasTransaccionesComponent;
  let fixture: ComponentFixture<PropiasTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiasTransaccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiasTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
