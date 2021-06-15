import {
  Component
} from '@angular/core';
declare var $: any;

@Component({
  selector: 'register', //Asignar un nombre de etiqueta, único
  templateUrl: './register.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./register.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class RegisterComponent { //Cambiar el nombre de AppComponent por el del nuestro
  Register() {
    var self = this;
    $.ajax({
      type: "POST",
      xhrFields: { //Esto permite compartir cookies
        withCredentials: true
      },
      url: 'http://localhost:666/users/register',
      data: {
        nickname: this.nickname,
        name: this.name,
        lastName: this.lastName,
        address: {
          street: this.address.street,
          suburb: this.address.suburb,
          city: this.address.city,
          state: this.address.state,
          zip: this.address.zip
        },
        email: this.email,
        password: this.password,
        phone: this.phone
      },
      success: function (res: any) {
        //Con el singleton cambiar el tipo de enlace en el menu header
        //Cambiarlo de Login a Mi Cuenta
        window.location.href = '/';
      },
      error: function (error: any) {
        self.invalidRegister = true;
        self.registerFailureReason = error.responseJSON.error;
      }
    });
  }

  UpdateValue(event: any, property: String) {
    //email
    var value = event.target.value;
    switch (property) {
      case "nickname":
        this.nickname = value;
        break;
      case "name":
        this.name = value;
        break;
      case "lastName":
        this.lastName = value;
        break;
      case "email":
        this.email = value;
        break;
      case "password":
        this.password = value;
        break;

      case "phone":
        this.phone = value;
        break;

      case "street":
        this.address.street = value;
        break;

      case "suburb":
        this.address.suburb = value;
        break;

      case "city":
        this.address.city = value;
        break;

      case "state":
        this.address.state = value;
        break;

      case "zip":
        this.address.zip = value;
        break;
    }
  }

  nickname = '';
  name = '';
  lastName = '';
  address = {
    street: '',
    suburb: '',
    city: '',
    state: '',
    zip: 0
  };
  email = '';
  password = '';
  phone = 0;

  invalidRegister = false;
  registerFailureReason = '';
}
