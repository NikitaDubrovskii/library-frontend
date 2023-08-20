import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './view/shared/navbar/navbar.module';
import {FooterModule} from './view/shared/footer/footer.module';
import {SidebarModule} from './view/sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './view/layouts/admin-layout/admin-layout.component';
import {USER_URL_TOKEN} from "./data/impl/user.service";
import {BOOK_URL_TOKEN} from "./data/impl/book.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserModule} from "@angular/platform-browser";
import {MatIconModule} from "@angular/material/icon";
import { BookInfoDialogComponent } from './view/book/book-info-dialog/book-info-dialog.component';
import { UserInfoDialogComponent } from './view/user/user-info-dialog/user-info-dialog.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        BrowserModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
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
export class AppModule {
}
