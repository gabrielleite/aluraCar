import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosProvider } from '../../providers/api/carros/carros.service';
import { EscolhaPage } from '../escolha/escolha';
import { Carro } from '../../models/carro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private _carros: Carro[];

  constructor(public navCtrl: NavController,
    private _carrosProvider: CarrosProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
  
    ngOnInit(): void {
      console.log('ngOnInit HomePage');
      let loader = this._loadingCtrl.create({
        content: 'Aguarde o carregamento...'
      });
      loader.present();

      this._carrosProvider
        .lista()
        .subscribe(
          (carros: Carro[]) => {
            this._carros = carros;
            loader.dismiss();
          },
          (err: HttpErrorResponse) => {
            console.log('deu erro');
            console.log(err);
            loader.dismiss();
            this._alertCtrl
              .create({
                title: 'Falha na conexão!',
                subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.' ,
                buttons: [{ text: 'Estou ciente' }]
              })
              .present();
          }
        );
    }

    seleciona(carro) {
      console.log(carro);
      this.navCtrl.push(EscolhaPage, {
        carroSelecionado: carro
      });
    }

    get carros() {
      return this._carros;
    }
}
