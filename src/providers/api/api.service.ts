import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiProvider {
  private _url: string = 'https://aluracar.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  get url() {
    return this._url;
  }
  get http() {
    return this._http;
  }

}

