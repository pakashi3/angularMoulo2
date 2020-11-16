import { Component } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wishlist';
  time = new Observable(observable => {
    setInterval(() => observable.next(new Date().toString()), 1000);
  });

  destinoAgregado(d) {
    //alert(d.nombre);
  }
}
