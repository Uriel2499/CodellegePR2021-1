import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { CartModule } from './cartInfo/cartInfo.module';
import { UserModule } from './userInfo/userInfo.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(CatalogoModule).catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(CartModule).catch(err => console.error(err));
platformBrowserDynamic().bootstrapModule(UserModule).catch(err => console.error(err));
