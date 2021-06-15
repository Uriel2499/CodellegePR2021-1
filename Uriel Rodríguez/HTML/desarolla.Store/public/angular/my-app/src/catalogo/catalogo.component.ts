import {
  Component
} from '@angular/core';

@Component({
  selector: 'catalogo-productos', //Asignar un nombre de etiqueta, único
  templateUrl: './catalogo.component.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./catalogo.component.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class CatalogoComponent { //Cambiar el nombre de AppComponent por el del nuestro
    numeroProductos = 10;
    numeroPaginas = 2;
    productos = [{name: 'iPhone 123'}];
}