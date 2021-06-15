import {
  Component,
  OnInit
} from '@angular/core';
import {
  Singleton
} from '../../refactoring/DataSingleton';
declare var $: any;

@Component({
  selector: 'cart', //Asignar un nombre de etiqueta, único
  templateUrl: './cart.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./cart.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class CartComponent implements OnInit {
  ngOnInit() {
    this.GetCart();
  }

  GetCart() {
    Singleton.GetInstance().ReloadCart();
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "GET",
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:666/carts/getCart",
      success: function (cartInfo: any) {
        if (cartInfo.products.length > 0) {
          self.products = cartInfo.products;
        } else {
          self.products = null;
        }
        self.total = cartInfo.total;
        Singleton.GetInstance().HideLoader();
      }
    });
  }

  AddOne(sku: any) {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "patch",
      xhrFields: {
        withCredentials: true
      },
      data: {
        sku: sku,
        qty: 1
      },
      url: "http://localhost:666/carts/add",
      success: function (response: any) {
        self.GetCart();
      }
    });
  }

  DeleteOne(sku: any) {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "patch",
      xhrFields: {
        withCredentials: true
      },
      data: {
        sku: sku,
        qty: 1
      },
      url: "http://localhost:666/carts/remove",
      success: function (response: any) {
        self.GetCart();
      }
    });
  }

  DeleteProduct(sku: any) {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "patch",
      xhrFields: {
        withCredentials: true
      },
      data: {
        sku: sku,
        all: true
      },
      url: "http://localhost:666/carts/remove",
      success: function (response: any) {
        self.GetCart();
      }
    });
  }

  CleanCart() {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "PATCH",
      xhrFields: {
        withCredentials: true
      },
      url: 'http://localhost:666/carts/cleanCart',
      success: function (cartInfo: any) {
        self.GetCart();
      }
    });
  }

  total = 0;
  products = null;

} //Cambiar el nombre de AppComponent por el del nuestro
