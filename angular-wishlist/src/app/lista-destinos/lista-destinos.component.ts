import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { DestinoViajes } from './../models/destino-viaje.models';
import { DestinosApliClient } from './../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { NuevoDestinoAction, ElegidoFavoritoAction } from '../models/destinos-viajes.state.model';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViajes>;
  uptades: string[];
  all;

  constructor(private destinosApiClient: DestinosApliClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.uptades = [];
    this.store.select(state => state.destinos.favorito)
    .subscribe(d => {
      if (d != null) {
        this.uptades.push('Se ha elegido a' + d.nombre);
      }
    });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit() {
  }
  
  agregado(d: DestinoViajes) {
  this.destinosApiClient.add(d);
  this.onItemAdded.emit(d);
 
  }

  elegido(e: DestinoViajes) {
    this.destinosApiClient.elegir(e);
    
  }
  getAll() {

  }
}
