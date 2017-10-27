import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';

import { AgendamentosProvider } from '../../providers/api/agendamentos/agendamentos.service';
import { AgendamentoDaoProvider } from '../../providers/dao/agendamento.dao';
import { Agendamento } from '../../models/agendamento';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public email: string;
  public senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  efetuaLogin() {
    console.log(this.email);
    console.log(this.senha);
    this.navCtrl.setRoot(HomePage);
  }

}
