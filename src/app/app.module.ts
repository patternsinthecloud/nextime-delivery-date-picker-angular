import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import 'qpilot-delivery-date';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SiteComponent } from 'src/app/site.component';

@NgModule({
  declarations: [AppComponent, SiteComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
