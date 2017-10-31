import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';

import { UsuariosProvider } from '../../providers/api/usuarios/usuarios.service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuariosProvider: UsuariosProvider) {
  }

  get usuarioLogado() {
    return this._usuariosProvider
      .obtemUsuarioLogado();
  }

}
