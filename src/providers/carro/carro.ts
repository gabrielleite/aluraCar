import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarroProvider {

  // private url: string = 'https://example.com/api/v1';
  private _url: string = 'https://aluracar.herokuapp.com';
  constructor(private _http: Http) {
    console.log('Hello AluraCarApiProvider Provider');
  }

  lista():Promise<any> {
    return this._http
            .get(this._url)
            .map(res => res.json())
            .toPromise();
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
