// @ts-nocheck
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Singleton
} from 'src/refactoring/DataSingleton';
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
        self.realUserNickname = datosUsuario.nickname;
        self.realUserEmail = datosUsuario.email;
        if (!self.userData.address) {
          self.userData.address = {
            street: '',
            suburb: '',
            city: '',
            state: '',
            zip: '',
          }
        }
      },
      error: function (error: any) {
        window.location.href = '/login';
      }
    });
  }

  LogOut() {
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: 'POST',
      xhrFields: {
        withCredentials: true
      },
      url: 'http://localhost:666/users/logout',
      success: function (result: any) {
        window.location.href = '/';
      }
    })
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
  };

  Editing = {
    nickname: false,
    name: false,
    lastName: false,
    email: false,
    phone: false,
    street: false,
    suburb: false,
    city: false,
    state: false,
    zip: false
  };

  realUserNickname = '';
  realUserEmail = '';

  errorInfo = '';

  UpdateInfo(property: String) {
    Singleton.GetInstance().ShowLoader();
    var self = this;
    var data = {};
    if(property === 'address') {
      data[property] = this.userData.address;
    } else {
      data[property] = this.userData[property];
    }

    $.ajax({
      type: 'PUT',
      xhrFields: {
        withCredentials: true
      },
      url: 'http://localhost:666/users/' + this.realUserNickname,
      data: data,
      success: function(result: any) {
        Singleton.GetInstance().HideLoader();
        self.realUserNickname = self.userData.nickname;
        self.realUserEmail = self.userData.email;
        self.Editing[property] = false;
        self.errorInfo = '';
      },
      error: function(err: any) {
        Singleton.GetInstance().HideLoader();
        self.errorInfo = err.responseJSON.error || err.responseJSON.message;
        self.userData.nickname = self.realUserNickname;
        self.userData.email = self.realUserEmail;
      }
    })
  }

  UpdateValue(event: any, property: String) {
    //email
    var value = event.target.value;
    switch (property) {
      case "nickname":
        this.userData.nickname = value;
        break;
      case "name":
        this.userData.name = value;
        break;
      case "lastName":
        this.userData.lastName = value;
        break;
      case "email":
        this.userData.email = value;
        break;

      case "phone":
        this.userData.phone = value;
        break;

      case "street":
        this.userData.address.street = value;
        break;

      case "suburb":
        this.userData.address.suburb = value;
        break;

      case "city":
        this.userData.address.city = value;
        break;

      case "state":
        this.userData.address.state = value;
        break;

      case "zip":
        this.userData.address.zip = value;
        break;
    }
  }
}