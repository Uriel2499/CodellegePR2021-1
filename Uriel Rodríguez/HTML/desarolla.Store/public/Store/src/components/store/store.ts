import {
  Component
} from '@angular/core';

@Component({
  selector: 'store', //Asignar un nombre de etiqueta, único
  templateUrl: './store.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./store.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})
//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class StoreComponent { //Cambiar el nombre de AppComponent por el del nuestro
  
}
