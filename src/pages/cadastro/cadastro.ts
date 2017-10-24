import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { Agendamento } from '../../models/agendamento';
import { AgendamentosProvider } from '../../providers/api/agendamentos/agendamentos.service';
import { AgendamentoDaoProvider } from '../../providers/dao/agendamento.dao';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  private _alerta: Alert;
  
  private _carro: Carro;
  private _precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentosProvider: AgendamentosProvider,
    private _agendamentoDaoProvider: AgendamentoDaoProvider,
    private _storage: Storage) {
      this._carro = this.navParams.get('carro');
      this._precoTotal = this.navParams.get('precoTotal');

      this._alerta =  this._alertCtrl.create({
        title: 'Aviso',
        buttons: [{
          text: 'OK',
          handler: () => { navCtrl.setRoot(HomePage); }
        }]
      });
  }

  agenda() {
    if(!this.nome || !this.email || !this.endereco) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'OK'}]
      }).present();

      return ;
    }

    let agendamento: Agendamento = {
      carro: this._carro.nome,
      precoTotal: this._precoTotal,
      cliente: this.nome,
      endereco: this.endereco,
      email: this.email,
      data: this.data,
      confirmado: false
    };

    this._agendamentoDaoProvider
      .ehAgendamentoDuplicado(agendamento)
      .then(duplicado => {
        console.log(duplicado);
        if (duplicado) throw new Error('Este agendamento já foi realizado!');
        this.confirmaAgendamento(agendamento);
        // .then(() => agendamento.confirmado = true, err => console.log(err))
        // .then(() => this._dao.salva(agendamento))
        // .then(() => agendamento.confirmado);
      })
      .catch(() => {
        this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
        this._alerta.present();
      });


    // Observable.forkJoin(
    //   [this._agendamentosProvider
    //   .agenda(agendamento)
    //   .map(() => agendamento.confirmado = true),
    //   this.salva(agendamento)]
    // ).subscribe(
    //   () => {
    //     this._alerta.setSubTitle('Agendamento realizado com sucesso.');
    //     this._alerta.present();
    //   },
    //   (err) => {
    //     console.log(err);
    //     this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
    //     this._alerta.present();
    //   },
    //   () => {
    //     console.log("terminou");
    //   }
    // );
    
    // this._agendamentosProvider
    //   .agenda(agendamento)
    //   .do(() => agendamento.confirmado = true)
    //   // .flatMap(() => this.salva(agendamento))
    //   // .finally(() => this.salva(agendamento))
    //   .subscribe(
    //     () => {
    //       this._alerta.setSubTitle('Agendamento realizado com sucesso.');
    //       this._alerta.present();
    //     },
    //     err => {
    //       console.log(err);
    //       this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
    //       this._alerta.present();
    //     },
    //     () => {
    //       console.log("terminou");
    //     }
    //   );
  }

  confirmaAgendamento(agendamento: Agendamento) {
    this._agendamentosProvider
      .agenda(agendamento)
      .subscribe(
        () => {
          this._alerta.setSubTitle('Agendamento realizado com sucesso.');
        },
        (err) => {
          console.log(err);
          this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
        },
        () => {
          console.log("terminou");
          this._agendamentoDaoProvider.salva(agendamento);
          this._alerta.present();
        }
      );
  }

  // salva(agendamento: Agendamento) {
  //   let a = 1;
  //   if (a==1) throw new Error("bla bla bla");
  //   let key = agendamento.email + agendamento.data.substr(0,10);
  //   // return this._storage.set(key, agendamento);
  //   return Observable.fromPromise(this._storage.set(key, agendamento));
  // }

  get carro() {
    return this._carro;
  }

  get precoTotal() {
    return this._precoTotal;
  }

}
