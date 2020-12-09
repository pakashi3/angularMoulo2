import { Component, OnInit, Output, EventEmitter, Inject, forwardRef } from '@angular/core';
import { DestinoViajes } from './../../models/destino-viaje.models';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter,debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { APP_CONFIG, AppConfig } from 'src/app/app.module';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
@Output() onItemAdded: EventEmitter<DestinoViajes>;
fg: FormGroup;
minLongitud = 3;
searchResults: string[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['',Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    });
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('cambio el formulario: ', form);
    })
   }

  ngOnInit() {
   let elemNombre = <HTMLInputElement>document.getElementById('nombre');
   fromEvent(elemNombre, 'input')
   .pipe(
     map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
     filter(text => text.length > 2),
     debounceTime(200),
     distinctUntilChanged(),
     switchMap ((text: string) => ajax(this.config.apiEnpoint + '/ciudades?q=' + text))
   ).subscribe(AjaxResponse => this.searchResults = AjaxResponse.response);
  }
  
  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViajes(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  nombreValidator(control: FormControl): {[s:string]: boolean} {
    const l = control.value.toString().trim().length;
    if (l > 0 && l <5){
      return{invalidNombre: true };
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s: string]: boolean} | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return{minLongNombre: true};
      }
      return null;
    }
  }

}
