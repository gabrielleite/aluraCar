import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Agendamento } from '../../models/agendamento';

@Injectable()
export class AgendamentoDaoProvider {
  constructor(private _storage: Storage) {}
    
  salva(agendamento: Agendamento) {
    let key = this._getKey(agendamento);
    return this._storage
                .set(key, agendamento);
  }
  
  ehAgendamentoDuplicado(agendamento: Agendamento) {
      let key = this._getKey(agendamento);
      
      return this._storage
                .get(key)
                .then(dado => {
                    return dado ? true : false;
                });
    }
    
    private _getKey(agendamento: Agendamento) {
      return agendamento.email + agendamento.data.substr(0,10);
    }
}