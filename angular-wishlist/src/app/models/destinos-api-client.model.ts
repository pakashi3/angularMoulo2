import { DestinoViajes } from './destino-viaje.models';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes.state.model';
import { Injectable } from '@angular/core';



@Injectable()
export class DestinosApliClient{
   constructor(private store: Store<AppState>) {
  }
    add(d: DestinoViajes) {
    this.store.dispatch(new NuevoDestinoAction(d));
    }
    elegir(d: DestinoViajes) {
      this.store.dispatch(new ElegidoFavoritoAction(d));
      }
  }
