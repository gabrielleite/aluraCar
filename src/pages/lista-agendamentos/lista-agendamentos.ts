import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';

import { AgendamentosProvider } from '../../providers/api/agendamentos/agendamentos.service';
import { AgendamentoDaoProvider } from '../../providers/dao/agendamento.dao';
import { Agendamento } from '../../models/agendamento';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html'
})
export class ListaAgendamentosPage {
  private _alerta: Alert;
  
  private _agendamentos: Agendamento[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _agendamentosProvider: AgendamentosProvider,
    private _agendamentoDao: AgendamentoDaoProvider) {
      
    this._agendamentoDao
      .listaTodos()
      .subscribe(agendamentos => this._agendamentos = agendamentos);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAgendamentosPage');
  }

  reenvia(agendamento: Agendamento) {
    console.log(agendamento);

    this._alerta =  this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{
        text: 'OK'
      }]
    });
    
    let loader = this._loadingCtrl.create({
      content: 'Aguarde o agendamento...'
    });
    loader.present();

    let mensagem = '';

    this._agendamentosProvider.agenda(agendamento)
    .flatMap(() => this._agendamentoDao.salva(agendamento))
    .subscribe(
      () => {
        mensagem = 'Agendamento realizado com sucesso.';
      },
      (err: Error) => {
        mensagem = err.message;
      },
      () => {
        loader.dismiss();
        this._alerta.setSubTitle(mensagem);
        this._alerta.present();
      }
    );
  }

  get agendamentos() {
    return this._agendamentos;
  }

}
