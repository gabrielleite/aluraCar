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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage
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
    CadastroPage
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
