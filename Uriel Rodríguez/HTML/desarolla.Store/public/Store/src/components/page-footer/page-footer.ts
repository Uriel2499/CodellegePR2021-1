import {
  Component
} from '@angular/core';

@Component({
  selector: 'main-footer', //Asignar un nombre de etiqueta, único
  templateUrl: './page-footer.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./page-footer.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})
//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class FooterComponent { //Cambiar el nombre de AppComponent por el del nuestro

}
