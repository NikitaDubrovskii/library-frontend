import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './view/shared/navbar/navbar.module';
import { FooterModule } from './view/shared/footer/footer.module';
import { SidebarModule } from './view/sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './view/layouts/admin-layout/admin-layout.component';
import {USER_URL_TOKEN} from "./data/impl/user.service";
import {BOOK_URL_TOKEN} from "./data/impl/book.service";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [
    {
      provide: USER_URL_TOKEN,
      useValue: 'http://localhost:8080/user'
    },
    {
      provide: BOOK_URL_TOKEN,
      useValue: 'http://localhost:8080/book'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
