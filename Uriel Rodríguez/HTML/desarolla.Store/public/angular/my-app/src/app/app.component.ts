import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Ejemplo de Angular';
  name = "Kevin";
  productos = [{
    sku: 1234,
    name: "iPhone"
  }, {
    sku: 1256,
    name: "Samsung"
  },{
    sku: 2356,
    name: "Xiaomi"
  }];

  CambiarTitulo() {
    this.title = "Angular cambia solo :D";
  }

  CambiarArreglo() {
    this.productos[1].sku = 6666666;
  }

}
