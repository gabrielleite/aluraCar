import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Agendamento } from '../../models/agendamento';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {
  constructor(private _storage: Storage) {}
    
  salva(agendamento: Agendamento) {
    let key = this._getKey(agendamento);
    let promise = this._storage
                      .set(key, agendamento)
                      .then(() => {
                        return key;
                      })
                      .catch(() => {
                        throw new Error('Não foi possível salvar o agendamento!');
                      });

    return Observable.fromPromise(promise);
  }
  
  ehAgendamentoDuplicado(agendamento: Agendamento) {
    let key = this._getKey(agendamento);
    
    let promise = this._storage
                      .get(key)
                      .then(dado => {
                        return dado ? true
                                    : false;
                      })
                      .catch(() => {
                        throw new Error('Não foi possível verificar se o agendamento já existe!');
                      });

    return Observable.fromPromise(promise);
  }
  
  private _getKey(agendamento: Agendamento) {
    return agendamento.email + agendamento.data.substr(0,10);
  }
}