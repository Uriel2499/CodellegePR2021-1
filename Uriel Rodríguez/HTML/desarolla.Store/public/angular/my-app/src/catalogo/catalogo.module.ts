import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CatalogoComponent } from './catalogo.component'; //Se importa el componente
//Es importante asignar el nombre igual al que exportamos en el archivo component.ts
//Ejemplo: Si mi componente es catalogo.component.ts, entonces debo importar CatalogoComponent

@NgModule({
  declarations: [
    CatalogoComponent //Se añade el componente importado arriba
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [CatalogoComponent] //Si se le desea añadir bootstrap a este componente
})

export class CatalogoModule { } //Exportar este módulo con el mismo nombre de nuestro componente
//Ejemplo: Si mi componente es catalogo.component.ts, entonces debo exportar CatalogoModule