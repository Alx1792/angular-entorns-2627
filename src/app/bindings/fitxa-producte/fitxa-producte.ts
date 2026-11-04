import { Component } from '@angular/core';
import { ProducteLab } from '../producte-lab';
import { Input,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fitxa-producte',
  imports: [],
  templateUrl: './fitxa-producte.html',
  styleUrl: './fitxa-producte.css',
})
export class FitxaProducte {
  //fitxa-producte -> es fill, nomes printara UN producte
  //DECLAREM INPUT I OUTPUT
  @Input() producte !: ProducteLab;
  @Input() enCarret = false;
  @Output() afegir = new EventEmitter<ProducteLab>();
  @Output() treure = new EventEmitter<ProducteLab>();

  get teEstoc(): boolean{
    return this.producte.estoc > 0;
  }
   get classesFitxa (): string{
    const classes = ['fitxa'];
    if (this.producte.preu > 500) classes.push('destacat');
    if (this.producte.preu < 50) classes.push('oferta');
    if (this.producte.estoc === 0) classes.push ('esgotat');
    return classes.join(' ');
  }
   get imatgeSegura () : string {
    return this.producte.imatgeUrl || 'https://placehold.co/300x180?text=Sense+imatge';
  }

  get urlFitxa () : string{
    return `https://botiga.cat/producte/${this.producte.id}`;
  }
  clickAfegir(): void{
    this.afegir.emit(this.producte)
  }
  clickTreure(): void{
    this.treure.emit(this.producte)
  }

}
