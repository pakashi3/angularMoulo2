import { Component, OnInit } from '@angular/core';
import { DestinosApliClient } from './../models/destinos-api-client.model';
import { DestinoViajes } from './../models/destino-viaje.models';
import {  ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css']
})
export class DestinoDetalleComponent implements OnInit {
destinos:DestinoViajes;

  constructor( private route: ActivatedRoute, private destinosApiClient:DestinosApliClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destinos = null;
  }

}
