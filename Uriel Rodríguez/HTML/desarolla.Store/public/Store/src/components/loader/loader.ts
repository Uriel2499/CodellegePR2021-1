import {
  Component,
  OnInit
} from '@angular/core';
import { Singleton } from '../../refactoring/DataSingleton';
declare var $: any;

@Component({
  selector: 'loader', //Asignar un nombre de etiqueta, único
  templateUrl: './loader.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./loader.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class LoaderComponent implements OnInit{
    ngOnInit(){
        var self = this;
        Singleton.GetInstance().ShowLoader = function() {
            self.ShowLoader();
        }

        Singleton.GetInstance().HideLoader = function() {
            self.HideLoader();
        }
    }

    ShowLoader() {
        this.active = true;
    }
    
    HideLoader() {
        this.active = false;
    }
    
    active = false;
}
