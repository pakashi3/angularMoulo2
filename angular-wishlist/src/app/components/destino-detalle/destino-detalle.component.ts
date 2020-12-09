import { Component, OnInit } from '@angular/core';
import { DestinosApliClient } from './../../models/destinos-api-client.model';
import { DestinoViajes } from './../../models/destino-viaje.models';
import {  ActivatedRoute  } from '@angular/router';
//import { AppState } from 'src/app/app.module';
//import { Console } from 'console';
//import { Store } from '@ngrx/store';

//class DestinosApliClientViejo {
 // getById(id: string): DestinoViajes {
  //  console.log('llamando por la clase viaje');
   // return null;
 // }
//}

//interface AppConfig {
//apiEndpoint: string;
//}
//const APP_CONFIG_VALUE: AppConfig = {
//  apiEndpoint: 'mi_api.com'
//}
//const APP_CONFIG = new InjectionToken<AppConfig>('api.config');

//class DestinosApliClientDecorated extends DestinosApliClient {
  //constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    //super(store);
  //}
  //getById(id: string): DestinoViajes {
    //console.log('llamando por la clase decorada!');
    //console.log('config: ' + this.config.apiEndpoint);
    //return super.getById(id);
  //}
//}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
     DestinosApliClient
   ]
})
export class DestinoDetalleComponent implements OnInit {
destinos:DestinoViajes;

  constructor( private route: ActivatedRoute, private destinosApiClient: DestinosApliClient) {}

  ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
    this.destinos = this.destinosApiClient.getById(id);
  }

}
