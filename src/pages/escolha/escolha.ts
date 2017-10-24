import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavLifecycles } from '../../utils/ionic/nav-lifecycles';
import { Acessorio } from '../../models/acessorio';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage implements OnInit, NavLifecycles {
  private _carro: any;
  private _acessorios: Acessorio[];
  private _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._carro = navParams.get('carroSelecionado');
    this._precoTotal = this._carro.preco;
    this._acessorios = [
      { nome: 'Freio ABS', preco: 800 },
      { nome: 'Ar-condicionado', preco: 1000 },
      { nome: 'MP3 Player', preco: 500 }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscolhaPage');
  }

  ngOnInit(): void {
    console.log('ngOnInit EscolhaPage');
  }

  atualizaTotal(ligado: boolean, acessorio) {
    
      ligado ?
          this._precoTotal += acessorio.preco :
          this._precoTotal -= acessorio.preco;
  }

  avancaAgendamento() {
    this.navCtrl.push(CadastroPage, {
      carro: this._carro,
      precoTotal: this._precoTotal
    });
  }

  get carro() {
    return this._carro;
  }
  get acessorios() {
    return this._acessorios;
  }
  get precoTotal() {
    return this._precoTotal;
  }
}
