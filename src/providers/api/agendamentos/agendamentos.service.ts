import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../api.service';
import { Agendamento } from '../../../models/agendamento';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AgendamentosProvider {
  _url: string;
  _http: HttpClient;

  constructor(private _api: ApiProvider) {
    this._url = this._api.url+'/api/agendamento';
    this._http = this._api.http;
  }

  agenda(agendamento: Agendamento): Observable<Agendamento> {
    // let params = new HttpParams()
    //               .set('modeloCarro', agendamento.carro)
    //               .set('nomeCliente', agendamento.cliente)
    //               .set('precoTotal', agendamento.precoTotal.toString())
    //               .set('enderecoCliente', agendamento.endereco)
    //               .set('emailCliente', agendamento.email)
    //               .set('data', agendamento.data);
                  // .get<Agendamento>(`${this._url}/salvarpedido?carro=${agendamento.carro}&nome=${agendamento.cliente}&preco=${agendamento.precoTotal}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`)
    return this._http
            .post(`${this._url}/agenda`, agendamento)
            .retry(3)
            .do(() => agendamento.confirmado = true)
            .catch(err => Observable.throw(new Error('Não foi possível realizar o agendamento!')));
  }
}
