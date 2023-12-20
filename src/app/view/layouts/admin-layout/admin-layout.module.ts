import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {BooksComponent} from "../../book/books.component";
import {UsersComponent} from "../../user/users.component";
import {BookEditDialogComponent} from "../../book/book-edit-dialog/book-edit-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UserEditDialogComponent} from "../../user/user-edit-dialog/user-edit-dialog.component";
import {BookAddDialogComponent} from "../../book/book-add-dialog/book-add-dialog.component";
import {UserAddDialogComponent} from "../../user/user-add-dialog/user-add-dialog.component";
import {BookConfirmDialogComponent} from "../../book/book-confirm-dialog/book-confirm-dialog.component";
import {BookGiveDialogComponent} from "../../book/book-give-dialog/book-give-dialog.component";
import {UserConfirmDialogComponent} from "../../user/user-confirm-dialog/user-confirm-dialog.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BookInfoDialogComponent} from "../../book/book-info-dialog/book-info-dialog.component";
import {UserInfoDialogComponent} from "../../user/user-info-dialog/user-info-dialog.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ],
    declarations: [
        BooksComponent,
        UsersComponent,
        BookEditDialogComponent,
        UserEditDialogComponent,
        BookAddDialogComponent,
        UserAddDialogComponent,
        BookConfirmDialogComponent,
        BookGiveDialogComponent,
        UserConfirmDialogComponent,
        BookInfoDialogComponent,
        UserInfoDialogComponent
    ],
    entryComponents: [
        BookEditDialogComponent,
        UserEditDialogComponent,
        BookAddDialogComponent,
        UserAddDialogComponent,
        BookConfirmDialogComponent,
        BookGiveDialogComponent,
        UserConfirmDialogComponent,
        BookInfoDialogComponent,
        UserInfoDialogComponent,

    ],
})

export class AdminLayoutModule {
}
