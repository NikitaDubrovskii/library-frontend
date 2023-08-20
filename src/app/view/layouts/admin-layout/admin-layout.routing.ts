import {Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {ProfileComponent} from '../../profile/profile.component';
import {TablesComponent} from '../../tables/tables.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {BooksComponent} from "../../book/books.component";
import {UsersComponent} from "../../user/users.component";

export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: HomeComponent},
    {path: 'user', component: ProfileComponent},
    {path: 'table', component: TablesComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'books', component: BooksComponent},
    {path: 'users', component: UsersComponent},
];
