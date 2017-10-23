import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../api.service';

@Injectable()
export class AgendamentosProvider {
  _url: string;
  _http: HttpClient;

  constructor(private _api: ApiProvider) {
    this._url = this._api.url;
    this._http = this._api.http;
  }

  agenda(modeloCarro, precoTotal, nomeUsuario, endereco, email, dataAgendamento) {
    return this._http
            .get(`${this._url}/salvarpedido?carro=${modeloCarro}&nome=${nomeUsuario}&preco=${precoTotal}&endereco=${endereco}&email=${email}&dataAgendamento=${dataAgendamento}`);
      // .then(() => alert('Sucesso'))
      // .catch(erro => alert('Falha'));
  }
}
