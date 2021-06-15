import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { StoreModule } from './components/store/store.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(StoreModule).catch(err => console.error(err));