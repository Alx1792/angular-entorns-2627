import { Component } from '@angular/core';
import { ProducteLab, PRODUCTES_LAB } from '../producte-lab';
import { FitxaProducte } from '../fitxa-producte/fitxa-producte';

@Component({
  selector: 'app-botiga',
  imports: [FitxaProducte],
  templateUrl: './botiga.html',
  styleUrl: './botiga.css',
})
export class Botiga {
  title='Botiga de bindings';
  productes : ProducteLab[] = PRODUCTES_LAB;
  modeCompacte = false;
  afegitAlCarret = false;
  carret: number[] = [];
  cerca = '';

  teEstoc(p: ProducteLab): boolean{
    return p.estoc > 0;
  }
  
  afegir(p: ProducteLab ): void{
    if (this.teEstoc(p) && !this.alCarret(p)){
      this.carret.push(p.id);
    }
  }
  alCarret(p: ProducteLab): boolean{
    return this.carret.includes(p.id);
  }
  treure(p: ProducteLab): void{
    this.carret = this.carret.filter(id => id !== p.id);
  }
  get totalCarret(): number{
    return this.productes
    .filter(p => this.alCarret(p))//es queda amb els productes que hi ha al carret
    .reduce((total, p) => total + p.preu, 0);//reduce suma els seus preus començant per 0
  }
  onCerca(event: Event): void{
    this.cerca =(event.target as HTMLInputElement).value;
  }
  get productesVisibles(): ProducteLab[]{
    const text = this.cerca.trim().toLowerCase();
    return this.productes.filter(p => p.nom.toLowerCase().includes(text));
  }

}
