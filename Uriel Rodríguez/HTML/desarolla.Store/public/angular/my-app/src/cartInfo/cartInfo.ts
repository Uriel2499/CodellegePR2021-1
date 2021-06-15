import {
    Component
  } from '@angular/core';
  
  @Component({
    selector: 'CartInfo', //Asignar un nombre de etiqueta, único
    templateUrl: './cartInfo.html', //Asignar la ruta del archivo .html que represente esta vista
    styleUrls: ['./cartInfo.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
  })
  
  //Debemos asignarle el nombre de nuestro componente.
  //Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
  export class CartComponent { //Cambiar el nombre de AppComponent por el del nuestro
      totalProductos = 5;
      totalPagar = 100.5;
      cliente = {
        nombre: "Kevin",
        apellidos: "Martin del Campo",
        direccion: "Calle 1243",
        telefono: 12345678
      };
  }