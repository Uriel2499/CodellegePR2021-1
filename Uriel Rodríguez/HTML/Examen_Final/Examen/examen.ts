import {
    Component
  } from '@angular/core';
  
  @Component({
    selector: 'examen',
    templateUrl: './examen.html',
    styleUrls: ['./examen.css'] 
  })
  
  export class ExamenComponent { 
    name: string;
    preguntas: Array<string>;
    cal: number;

  }
  