import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { Agendamento } from '../../models/agendamento';
import { AgendamentosProvider } from '../../providers/api/agendamentos/agendamentos.service';
import { HomePage } from '../home/home';
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
    private _agendamentosProvider: AgendamentosProvider,
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
      data: this.data
    };
    
    this._agendamentosProvider
      .agenda(agendamento)
      .subscribe(
        () => {
          this.salva(agendamento, true);
          this._alerta.setSubTitle('Agendamento realizado com sucesso.');
          this._alerta.present();
        },
        err => {
          console.log(err);
          this.salva(agendamento, false);
          this._alerta.setSubTitle('Não foi possível realizar o agendamento!');
          this._alerta.present();
        }
      )
  }

  salva(agendamento: Agendamento, confirmado: boolean) {
    agendamento.confirmado = confirmado;
    let key = agendamento.email + agendamento.data.substr(0,10);
    this._storage.set(key, agendamento);
  }

  get carro() {
    return this._carro;
  }

  get precoTotal() {
    return this._precoTotal;
  }

}
