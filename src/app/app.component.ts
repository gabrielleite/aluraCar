import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosProvider } from '../providers/api/usuarios/usuarios.service';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  
  rootPage:any = LoginPage;

  public paginas = [
    { titulo: 'Agendamentos', icone: 'calendar', componente: ListaAgendamentosPage },
    { titulo: 'Perfil', icone: 'person', componente: PerfilPage }
  ];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuariosService: UsuariosProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(pagina): void {
    this.nav.push(pagina);
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }
}

