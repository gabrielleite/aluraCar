import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../api.service';
import { Agendamento } from '../../../models/agendamento';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { AgendamentoDaoProvider } from '../../dao/agendamento.dao';

@Injectable()
export class AgendamentosProvider {
  _url: string;
  _http: HttpClient;

  constructor(private _api: ApiProvider,
    private _agendamentoDao: AgendamentoDaoProvider) {

    this._url = this._api.url;
    this._http = this._api.http;
  }

  metodoX(agendamento) {
    return this._agendamentoDao
      .ehAgendamentoDuplicado(agendamento)
      .flatMap(ehDuplicado => {
        console.log('É duplicado? ' + ehDuplicado);
        if (ehDuplicado) throw new Error('Agendamento existente!');
        return this._agendamentoDao.salva(agendamento);
      })
      .flatMap(() => this.agenda(agendamento))
      .flatMap(() => this._agendamentoDao.salva(agendamento));
  }

  metodoY(agendamento) {
    return this.
      agenda(agendamento)
      .flatMap(() => this._agendamentoDao.salva(agendamento));
  }

  agenda(agendamento: Agendamento): Observable<Agendamento> {
    let params = new HttpParams()
                  .set('carro', agendamento.carro)
                  .set('nome', agendamento.cliente)
                  .set('preco', agendamento.precoTotal.toString())
                  .set('endereco', agendamento.endereco)
                  .set('email', agendamento.email)
                  .set('dataAgendamento', agendamento.data);
                  // .get<Agendamento>(`${this._url}/salvarpedido?carro=${agendamento.carro}&nome=${agendamento.cliente}&preco=${agendamento.precoTotal}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`)
    return this._http
            .get<Agendamento>(`${this._url}/salvarpedido`, { params: params })
            .retry(3)
            .do(() => agendamento.confirmado = true)
            .catch(err => Observable.throw(new Error('Não foi possível realizar o agendamento!')));
  }
}
