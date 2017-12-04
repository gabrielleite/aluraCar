import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { Agendamento } from '../../models/agendamento';
import { AgendamentosProvider } from '../../providers/api/agendamentos/agendamentos.service';
import { AgendamentoDaoProvider } from '../../providers/dao/agendamento.dao';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

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
    private _loadingCtrl: LoadingController,
    private _agendamentosProvider: AgendamentosProvider,
    private _agendamentoDao: AgendamentoDaoProvider,
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

    let loader = this._loadingCtrl.create({
      content: 'Aguarde o agendamento...'
    });
    loader.present();

    let agendamento: Agendamento = {
      modeloCarro: this._carro.nome,
      precoTotal: this._precoTotal,
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      data: this.data,
      confirmado: false
    };

    let mensagem = '';


    // this._agendamentoDaoProvider.salva(agendamento)
    //     .flatMap(() => this._agendamentosProvider.agenda(agendamento))
    //     .flatMap(() => this._agendamentoDaoProvider.salva(agendamento))
    //     .subscribe(
    //       () => {
    //         mensagem = 'Agendamento realizado com sucesso.';
    //       },
    //       (err: Error) => {
    //         mensagem = err.message;
    //       },
    //       () => {
    //         loader.dismiss();
    //         this._alerta.setSubTitle(mensagem);
    //         this._alerta.present();
    //       }
    //     );

    // this._agendamentoDao
    //   .ehAgendamentoDuplicado(agendamento)
    //   .flatMap((ehDuplicado) => {
    //     console.log('É duplicado? ' + ehDuplicado);
    //     if (ehDuplicado) throw new Error('Agendamento existente!');
    //     return this._agendamentoDao.salva(agendamento);
    //   })
    //   .flatMap(() => this._agendamentosProvider.agenda(agendamento))
    //   .flatMap(() => this._agendamentoDao.salva(agendamento))
    //   .finally(() => {
    //     loader.dismiss();
    //     this._alerta.setSubTitle(mensagem);
    //     this._alerta.present();
    //   })
    //   .subscribe(
    //     () => {
    //       mensagem = 'Agendamento realizado com sucesso.';
    //     },
    //     (err: Error) => {
    //       mensagem = err.message;
    //     }
    //   ); 

    this._agendamentosProvider
            .agenda(agendamento)
            .flatMap((valor) => {
                let observable = this.salva(agendamento);
                if (valor instanceof Error) {
                  throw valor;
                }
                return observable;
              }
            )
            .finally(
              () => {
                loader.dismiss();
                this._alerta.setSubTitle(mensagem);
                this._alerta.present();
              }
            )
            .subscribe(
              () => mensagem = 'Agendamento realizado com sucesso',
              (err: Error)  => mensagem = err.message
            );
  }

  salva(agendamento: Agendamento) {
    // let a = 1;
    // if (a==1) return Observable.throw(new Error("bla bla bla"));
    let key = this.email + this.data.substr(0,10);
    // return this._storage.set(key, agendamento);
    return Observable.fromPromise(this._storage.set(key, agendamento));
  }

  get carro() {
    return this._carro;
  }

  get precoTotal() {
    return this._precoTotal;
  }

}
