import { TryCatchStmt } from '@angular/compiler';
import {
  Component
} from '@angular/core';

@Component({
  selector: 'UserInfo', //Asignar un nombre de etiqueta, único
  templateUrl: './userInfo.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./userInfo.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class UserComponent { //Cambiar el nombre de AppComponent por el del nuestro
    username = "KevinM";
    name = "Kevin";
    lastName = "Martin del Campo";
    member = (new Date()).toDateString();
}