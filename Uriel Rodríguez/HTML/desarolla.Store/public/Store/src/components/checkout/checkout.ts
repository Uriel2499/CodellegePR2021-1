import {
  Component,
  OnInit
} from '@angular/core';
import {
  Singleton
} from '../../refactoring/DataSingleton';
declare var $: any;
declare var paypal: any;

@Component({
  selector: 'checkout', //Asignar un nombre de etiqueta, único
  templateUrl: './checkout.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./checkout.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})

//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class CheckoutComponent implements OnInit { //Cambiar el nombre de AppComponent por el del nuestro

  ngOnInit() {
    this.GetUserData();
    var self = this;
    Singleton.GetInstance().UpdateCheckout = function (cart: any) {
      self.cart = cart;
      self.cart.products.push({
        sku: 'Gastos de envío',
        name: 'Gastos de envío',
        qty: 1,
        unit_price: self.gastosEnvio
      });

      self.cart.total += self.gastosEnvio;
    };

    paypal.Buttons({
      createOrder: function (data: any, actions: any) {
        // This function sets up the details of the transaction, including the amount and line item details.
        var articulos = new Array; //[]

        for (var i = 0; i < self.cart.products.length; i++) {
          var product = { name: '', qty: 0, unit_price: 0, sku: '' };

          product = self.cart.products[i];
          articulos.push({
            name: product.name,
            quantity: product.qty,
            unit_amount: {
              currency_code: "MXN",
              value: (product.unit_price - product.unit_price * 0.16).toFixed(2)
            },
            tax: {
              currency_code: "MXN",
              value: (product.unit_price * 0.16).toFixed(2)
            },
            sku: product.sku
          });
        }

        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'MXN',
              breakdown: {
                item_total: {
                  currency_code: 'MXN',
                  value: (self.cart.total * 0.84).toFixed(2)
                },
                tax_total: {
                  currency_code: 'MXN',
                  value: (self.cart.total * 0.16).toFixed(2)
                }
              },
              value: self.cart.total //Total a pagar
            },
            items: articulos
          }]
        });
      }
    }).render('#paypal-payment');
  }

  GetCart(cart: any) {
    this.cart = cart;
  }

  GetUserData() {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "GET",
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:666/users/profile",
      success: function (datosUsuario: any) {
        self.userData = datosUsuario;
        if (!self.userData.address) {
          self.userData.address = {
            street: '',
            suburb: '',
            city: '',
            state: '',
            zip: '',
          }
        }

        if (!self.userData.phone) {
          self.userData.phone = '';
        }

        Singleton.GetInstance().HideLoader();
      }
    });
  }

  UpdateValue(event: any, property: String) {
    //email
    var value = event.target.value;
    switch (property) {
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

  //ValidateCart

  userData = {
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

  gastosEnvio = 220;

  cart = {
    quantity: 0,
    total: 0,
    products: new Array
  };
}
