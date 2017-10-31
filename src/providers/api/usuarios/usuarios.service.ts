import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
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
    let params = new HttpParams()
                      .set('email', email)
                      .set('senha', senha);
    
    return this._http
                .get<Usuario>(`${this._url}/login`, { params: params })
                .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

}
