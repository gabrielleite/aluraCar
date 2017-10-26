import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/dao/agendamento.dao';
import { Agendamento } from '../../models/agendamento';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  private _agendamentos: Agendamento[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider) {
    this._agendamentoDao
      .listaTodos()
      .subscribe(agendamentos => this._agendamentos = agendamentos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAgendamentosPage');
  }

  get agendamentos() {
    return this._agendamentos;
  }

}
