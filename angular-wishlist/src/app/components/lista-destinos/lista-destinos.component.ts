import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { DestinoViajes } from './../../models/destino-viaje.models';
import { DestinosApliClient } from './../../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.module';


@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApliClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViajes>;
  uptades: string[];


  constructor(private destinosApiClient: DestinosApliClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter();
    this.uptades = [];
  }

  ngOnInit() {

    this.store.select(state => state.destinos.favorito)
    .subscribe(data => {
      const f = data;
      if (f != null) {
        this.uptades.push('Se ha elegido: ' + f.nombre);
      }
    });
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
