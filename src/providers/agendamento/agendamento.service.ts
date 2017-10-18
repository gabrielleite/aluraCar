import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AgendamentoProvider {

  constructor(private _http: Http) {
    console.log('Hello AgendamentoServiceProvider Provider');
  }

  agenda(modeloCarro, precoTotal, nomeUsuario, endereco, email, dataAgendamento) {
    return this._http
            .get(`https://aluracar.herokuapp.com/salvarpedido?carro=${modeloCarro}&nome=${nomeUsuario}&preco=${precoTotal}&endereco=${endereco}&email=${email}&dataAgendamento=${dataAgendamento}`)
            .toPromise();
      // .then(() => alert('Sucesso'))
      // .catch(erro => alert('Falha'));
  }
}
