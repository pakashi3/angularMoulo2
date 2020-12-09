import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mensajeError: string;

  constructor(public autoService: AuthService) {
    this.mensajeError = '';
   }

  ngOnInit(): void {
  }
  login(username: string, password: string): boolean {
    this.mensajeError = '';
    if (!this.autoService.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';
      setTimeout(function(){
        this.mensajeError = '';
      }.bind(this), 2500);
    }
    return false;
    }
    logout(): boolean {
      this.autoService.logout();
      return false;
    }
  }

