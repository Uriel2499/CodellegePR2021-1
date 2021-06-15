import {
  Component
} from '@angular/core';
import { Singleton } from '../../refactoring/DataSingleton';
declare var $: any;

@Component({
  selector: 'login', //Asignar un nombre de etiqueta, único
  templateUrl: './login.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./login.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class LoginComponent { //Cambiar el nombre de AppComponent por el del nuestro
  Login() {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "POST",
      xhrFields: { //Esto permite compartir cookies
        withCredentials: true
      },
      url: 'http://localhost:666/users/login',
      data: {
        email: this.email,
        nickname: this.email,
        password: this.password
      },
      success: function (res: any) {
        Singleton.GetInstance().HideLoader();
        self.invalidLogin = false;
        window.location.href = "/";
      },
      error: function (error: any) {
        Singleton.GetInstance().HideLoader();
        self.invalidLogin = true;
      }
    });
  }

  UpdateValue(event: any, property: String) {
    //email
    var value = event.target.value;
    switch(property){
      case "email":
        this.email = value;
        break;
      case "password":
        this.password = value;
        break;
    }
  }

  email = '';
  password = '';
  invalidLogin = false;
}
