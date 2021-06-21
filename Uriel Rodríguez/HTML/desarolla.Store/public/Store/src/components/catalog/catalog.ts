import {
  Component,
  OnInit
} from '@angular/core';
import { Singleton } from '../../refactoring/DataSingleton';
declare var $: any;

@Component({
  selector: 'catalog', //Asignar un nombre de etiqueta, único
  templateUrl: './catalog.html', //Asignar la ruta del archivo .html que represente esta vista
  styleUrls: ['./catalog.css'] //Un arreglo con las rutas de los CSS que queremos en este componente
})
//Debemos asignarle el nombre de nuestro componente.
//Ejemplo: Si se llama catalogo.component.ts, debemos exportar CatalogoComponent
export class CatalogComponent implements OnInit {

  ngOnInit() {
    //console.log('Yo me ejecuto después de que se incializa el componente');
    //console.log('El valor de productos es: ' + this.products);
    //Hacer mi petición a http://localhost:666/products/all
    this.GetProducts();
    $(".toast").toast();
  }

  GetProducts() {

    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "GET",
      url: `http://localhost:666/products/search?name=${this.searchFilters.name}&price=0,${this.searchFilters.price}&stock=${this.searchFilters.stock ? 'true' : ''}`,
      success: function (res: any) {
        //console.log(self.products); //null
        self.products = res;
        Singleton.GetInstance().HideLoader();
        //console.log(self.products); //[]
      }
    });
  }

  AddToCart(sku: String) {
    var self = this;
    Singleton.GetInstance().ShowLoader();
    $.ajax({
      type: "PATCH",
      xhrFields: { //Esto permite compartir cookies
        withCredentials: true
      },
      url: 'http://localhost:666/carts/add',
      data: {
        sku: sku,
        qty: 1
      },
      success: function (res: any) {
        $(".toast").toast('show');
        Singleton.GetInstance().ReloadCart();
        Singleton.GetInstance().HideLoader();
        //console.log('Add to cart: ');
        //console.log(res);
      }
    });
  }

  products = new Array;
  searchFilters = {
    name: '',
    price: 15000,
    stock: false
  }

  UpdateName(element: any) {
    this.searchFilters.name = element.value;
  }

  UpdatePrice(element: any) {
    this.searchFilters.price = element.value;
  }

  UpdateStock(element: any) {
    this.searchFilters.stock = element.checked;
    this.GetProducts();
  }

  CheckKey(event:any) {
    //Si es enter
    if(event.keyCode === 13) {
      this.GetProducts();
    }
  }
}