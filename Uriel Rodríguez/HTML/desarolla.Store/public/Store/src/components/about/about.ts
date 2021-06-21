import {
  Component
} from '@angular/core';

@Component({
  selector: 'about', //Asignar un nombre de etiqueta, único
  templateUrl: './about.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./about.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class AboutComponent { //Cambiar el nombre de AppComponent por el del nuestro

}
