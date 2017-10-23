import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Carro } from '../../../models/carro';
import { ApiProvider } from '../api.service';

@Injectable()
export class CarrosProvider {
  _url: string;
  _http: HttpClient;

  constructor(private _api: ApiProvider) {
    this._http = this._api.http;
    this._url = this._api.url;
  }

  lista(): Observable<Carro[]> {
    return this._http
            .get<Carro[]>(this._url);
    // .then(carros => {
    //   this.carros = carros;
    //   loader.dismiss();
    // })
    // .catch(err => {
    //   console.log('deu erro');
    //   console.log(err);
    //   loader.dismiss();
    //   this._alertCtrl
    //     .create({
    //       title: 'Falha na conexão!',
    //       subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde.' ,
    //       buttons: [{ text: 'Estou ciente' }]
    //     })
    //     .present();
    // });
  }

}
