import {
  Component,
  OnInit
} from '@angular/core';
import { Singleton } from 'src/refactoring/DataSingleton';

@Component({
  selector: 'confirmation', //Asignar un nombre de etiqueta, único
  templateUrl: './confirmation.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./confirmation.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class ConfirmationComponent implements OnInit { //Cambiar el nombre de AppComponent por el del nuestro
    
    ngOnInit() {
        this.GetPedido();
    }
    
    GetPedido() {
        //Llamada al endpoint del pedido con el LastOrder de una cookie
        this.numeroPedido = null;

        if(this.numeroPedido === null) {
            window.location.href = '/';
        }
    }

    numeroPedido = null;
}
