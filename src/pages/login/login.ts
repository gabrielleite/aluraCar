import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';

import { UsuariosProvider } from '../../providers/api/usuarios/usuarios.service';

import { Agendamento } from '../../models/agendamento';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public email: string = 'joao@alura.com.br';
  public senha: string = 'alura123';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuariosProvider: UsuariosProvider,
    private _loadingCtrl: LoadingController, private _alertCtrl: AlertController) {
  }

  efetuaLogin() {
    console.log(this.email);
    console.log(this.senha);
    // this.navCtrl.setRoot(HomePage);

    let loading = this._loadingCtrl.create({
      content: 'Efetuando login, aguarde...'
    });
    loading.present();

    this._usuariosProvider
      .efetuaLogin(this.email, this.senha)
      .subscribe(
        (usuario) => {
          console.log(usuario);
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        },
        (err) => {
          loading.dismiss();
          this._alertCtrl.create({
            title: 'Problema no login',
            subTitle: 'Email ou senha inválidos. Verifique!',
            buttons: [{ text: 'Ok'}]
          }).present();
        }
      );
  }

}
