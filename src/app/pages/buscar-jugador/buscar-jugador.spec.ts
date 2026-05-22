import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarJugador } from './buscar-jugador';

describe('BuscarJugador', () => {
  let component: BuscarJugador;
  let fixture: ComponentFixture<BuscarJugador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarJugador],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarJugador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
