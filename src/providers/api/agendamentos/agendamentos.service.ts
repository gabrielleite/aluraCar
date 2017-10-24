import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../api.service';
import { Agendamento } from '../../../models/agendamento';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AgendamentosProvider {
  _url: string;
  _http: HttpClient;

  constructor(private _api: ApiProvider) {
    this._url = this._api.url;
    this._http = this._api.http;
  }

  agenda(agendamento: Agendamento): Observable<Agendamento> {
    return this._http
            .get<Agendamento>(`${this._url}/salvarpedido?carro=${agendamento.carro}&nome=${agendamento.cliente}&preco=${agendamento.precoTotal}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`)
            .do(() => agendamento.confirmado = true);
      // .then(() => alert('Sucesso'))
      // .catch(erro => alert('Falha'));
  }
}
