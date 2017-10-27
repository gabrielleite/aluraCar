import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// ======================================================================
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from '@ionic/storage';
import { ApiProvider } from '../providers/api/api.service';
import { CarrosProvider } from '../providers/api/carros/carros.service';
import { AgendamentosProvider } from '../providers/api/agendamentos/agendamentos.service';
import { AgendamentoDaoProvider } from '../providers/dao/agendamento.dao';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    ListaAgendamentosPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'aluracar',
      storeName: 'agendamentos',
      driverOrder: ['indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    ListaAgendamentosPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    CarrosProvider,
    AgendamentosProvider,
    AgendamentoDaoProvider
  ]
})
export class AppModule {}
