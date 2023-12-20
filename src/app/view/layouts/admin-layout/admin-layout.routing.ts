import {Routes} from '@angular/router';

import {BooksComponent} from "../../book/books.component";
import {UsersComponent} from "../../user/users.component";

export const AdminLayoutRoutes: Routes = [
    {path: 'books', component: BooksComponent},
    {path: 'users', component: UsersComponent}
];
