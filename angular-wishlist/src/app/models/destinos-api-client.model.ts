import { Injectable, forwardRef, Inject } from '@angular/core';
import { DestinoViajes } from './destino-viaje.models';
import { Store} from '@ngrx/store';
import { NuevoDestinoAction, ElegidoFavoritoAction } from './destinos-viajes.state.model';
import { AppState, APP_CONFIG, AppConfig, db } from '../app.module';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';




@Injectable()
export class DestinosApliClient{
  destinos: DestinoViajes[] = [];

 
   constructor(private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig, private http: HttpClient
    ) {
     this.store.select(state => state.destinos).subscribe((data) => {
       console.log('destinos sub store');
       console.log(data);
       this.destinos = data.items;
     });
     this.store.subscribe((data) => {
       console.log('all store');
       console.log(data);
     });
  }
    add(d: DestinoViajes) {
     const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
     const req = new HttpRequest('POST', this.config.apiEnpoint + '/my', {nuevo: d.nombre}, {headers: headers});
     this.http.request(req).subscribe((data: HttpResponse<{}>) => {
       if (data.status == 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
        const myDb = db;
        myDb.destinos.add(d);
        console.log('todos los destinos de la db!');
        myDb.destinos.toArray().then(destinos => console.log(destinos));
       }
     });
     }
  

    
    getById(id: string): DestinoViajes {
      return this.destinos.filter(function(d) {return d.id.toString() == id; }) [0];
    }
    getAll(): DestinoViajes[] {
      return this.destinos;
    }

    elegir(d: DestinoViajes) {
       // aqui invocamos al servidor
      this.store.dispatch(new ElegidoFavoritoAction(d));
      }
  }
