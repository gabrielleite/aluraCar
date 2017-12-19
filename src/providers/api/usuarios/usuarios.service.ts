import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ApiProvider } from '../api.service';
import { Usuario } from '../../../models/usuario';

@Injectable()
export class UsuariosProvider {
  _url: string;
  _http: HttpClient;

  private _usuarioLogado: Usuario;

  constructor(private _api: ApiProvider) {
    this._http = this._api.http;
    this._url = this._api.url;
  }

  efetuaLogin(email: string, senha: string): Observable<Usuario> {
    
    return this._http
                .post<Usuario>(`${this._url}/api/login`, { email, senha })
                .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

}
