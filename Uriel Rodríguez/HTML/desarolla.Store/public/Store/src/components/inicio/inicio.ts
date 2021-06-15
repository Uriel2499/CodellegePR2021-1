import {
  Component
} from '@angular/core';

@Component({
  selector: 'inicio', //Asignar un nombre de etiqueta, único
  templateUrl: './inicio.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./inicio.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class InicioComponent { //Cambiar el nombre de AppComponent por el del nuestro

}
