import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { StoreComponent } from './store'; //Se importa el componente
import { HeaderComponent } from '../menu-header/menuHeader';
import { CatalogComponent } from '../catalog/catalog';
import { InicioComponent } from '../inicio/inicio';
import { FooterComponent } from '../page-footer/page-footer';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';
import { AccountComponent } from '../account/account';
import { CartComponent } from '../cart/cart';
import { CheckoutComponent } from '../checkout/checkout';
import { ConfirmationComponent } from '../confirmation/confirmation';

import { LoaderComponent } from '../loader/loader';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent }
];
//Es importante asignar el nombre igual al que exportamos en el archivo component.ts
//Ejemplo: Si mi componente es catalogo.component.ts, entonces debo importar CatalogoComponent

@NgModule({
  declarations: [
    StoreComponent, //Se añade el componente importado arriba
    HeaderComponent,
    CatalogComponent,
    FooterComponent,
    CartComponent,
    LoaderComponent,
    CheckoutComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [StoreComponent]
})

export class StoreModule { } //Exportar este módulo con el mismo nombre de nuestro componente
//Ejemplo: Si mi componente es catalogo.component.ts, entonces debo exportar CatalogoModule