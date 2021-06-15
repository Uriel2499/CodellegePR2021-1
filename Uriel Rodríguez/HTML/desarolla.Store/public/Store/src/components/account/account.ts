import {
  Component,
  OnInit
} from '@angular/core';
declare var $: any;

@Component({
  selector: 'account', //Asignar un nombre de etiqueta, único
  templateUrl: './account.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./account.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class AccountComponent implements OnInit { //Cambiar el nombre de AppComponent por el del nuestro

  ngOnInit() {
    this.GetUserData();
  }

  GetUserData() {
    var self = this;
    $.ajax({
      type: "GET",
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:666/users/profile",
      success: function (datosUsuario: any) {
        self.userData = datosUsuario;
        if(!self.userData.address) {
          self.userData.address = {
            street: '',
            suburb: '',
            city: '',
            state: '',
            zip: '',
          }
        }
      }
    });
  }

  userData = {
    nickname: '',
    name: '',
    lastName: '',
    address: {
      street: '',
      suburb: '',
      city: '',
      state: '',
      zip: '',
    },
    email: '',
    phone: '',
  }

}
