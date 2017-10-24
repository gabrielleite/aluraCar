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
    // para receber a resposta como um todo, incluindo os cabeçalhos
    // e não apenas o corpo
    // .get<MyJsonData>('/data.json', {observe: 'response'})

    // para obter a resposta em outro formato
    // .get('/textfile.txt', {responseType: 'text'})
    return this._http
            .get<Carro[]>(this._url);
  }

}
