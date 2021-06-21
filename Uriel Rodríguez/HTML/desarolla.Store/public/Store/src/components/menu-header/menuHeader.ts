import {
  Component,
  OnInit
} from '@angular/core';
import {
  Singleton
} from '../../refactoring/DataSingleton';
declare var $: any;

@Component({
  selector: 'main-menu', //Asignar un nombre de etiqueta, único
  templateUrl: './menuHeader.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./menuHeader.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.ReloadCart();
    var self = this;
    Singleton.GetInstance().ReloadCart = function () {
      self.ReloadCart();
    };

    this.CheckSession();
  }

  CheckSession() {
    var self = this;
    $.ajax({
      type: "GET",
      xhrFields: { //Esto permite compartir cookies
        withCredentials: true
      },
      url: "http://localhost:666/users/getSession",
      success: function (result: any) {
        if (result.session === true) {
          if (window.location.pathname === '/register' || window.location.pathname === '/login') {
            window.location.href = '/';
          }
          self.accountRedirect = "Mi Cuenta";
        }
      },
      error: function () {
        self.accountRedirect = "Login";
      }
    });
  }

  ReloadCart() {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "GET",
      xhrFields: { //Esto permite compartir cookies
        withCredentials: true
      },
      url: "http://localhost:666/carts/getCart",
      success: function (cartInfo: any) {
        //Mostrar un modal o mensaje con los issues
        var issues = cartInfo.cart_issues;
        if (issues.length) {
          var messages = '';
          for (var i = 0; i < issues.length; i++) {
            const problema = issues[i];
            messages += problema.issue + "<br>En Producto: " + problema.product.sku + "<br>Nombre: " + problema.product.name + "<hr>";
          }

          //Mostrar modal
          alert(messages);
        }

        cartInfo = cartInfo.cart;

        if (Singleton.GetInstance().UpdateCheckout) {
          var copia = Object.assign({}, cartInfo);
          Singleton.GetInstance().UpdateCheckout(copia);
        }

        if (Singleton.GetInstance().UpdateCartPage) {
          var copia = Object.assign({}, cartInfo);
          Singleton.GetInstance().UpdateCartPage(copia);
        }

        self.numberProducts = cartInfo.quantity;
        Singleton.GetInstance().HideLoader();
      }
    });
  }

  //Cambiar el nombre de AppComponent por el del nuestro
  accountRedirect = 'Login';
  numberProducts = 0;
}