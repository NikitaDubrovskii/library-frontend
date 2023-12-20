import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../data/impl/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UserEditDialogComponent} from "./user-edit-dialog/user-edit-dialog.component";
import {UserAddDialogComponent} from "./user-add-dialog/user-add-dialog.component";
import {BookService} from "../../data/impl/book.service";
import {UserConfirmDialogComponent} from "./user-confirm-dialog/user-confirm-dialog.component";
import {UserInfoDialogComponent} from "./user-info-dialog/user-info-dialog.component";
import {Book} from "../../model/book";

declare var $: any;

@Component({
    selector: 'app-user',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['color', 'number', 'firstName', 'secondName', 'email', 'id', 'countOfBooks', 'options'];
    dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    users: User[];
    books: Book[];

    constructor(private userService: UserService,
                private bookService: BookService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fillTable();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // фильтр поиска по любым критериям
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    // получить пользователей из БД и заполнить таблицу
    fillTable() {
        this.userService.getAll().subscribe((users) => {
            this.dataSource.data = users;
        });
        this.bookService.getAll().subscribe((books) => {
            this.books = books;
        });
    }

    // по нажатию на строку в таблице открывается окно с пользователем
    openEditDialog(user: User): void {
        const dialogRef = this.dialog.open(UserEditDialogComponent, {
            width: '800px',
            data: user,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe((updatedUser) => {
            if (updatedUser) {
                this.notification('success', `Читатель <b>${updatedUser.firstName} ${updatedUser.secondName}</b> обновлен!`)
                this.fillTable()
            } else {
                this.notification('warning', `Обновление читателя было отменено!`)
            }
        })
    }

    // добавление нового пользователя
    openAddDialog(): void {
        const dialogRef = this.dialog.open(UserAddDialogComponent, {
            width: '500px',
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe((savedUser) => {
            if (savedUser) {
                this.notification('success', `Читатель <b>${savedUser.firstName} ${savedUser.secondName}</b> добавлен!`)
                this.fillTable();
            } else {
                this.notification('warning', `Добавление читателя было отменено!`)
            }
        })
    }

    // открыть окно подтверждения удаления
    openConfirmDialog(user: User): void {
        const dialogRef = this.dialog.open(UserConfirmDialogComponent, {
            width: '500px',
            data: user,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe((deletedUser) => {
            if (deletedUser) {
                this.notification('success', `Читатель <b>${deletedUser.firstName} ${deletedUser.secondName}</b> удален!`)
                this.fillTable();
            } else {
                this.notification('warning', `Удаление читателя было отменено!`)
            }
        })
    }

    // окно с информацией о читателе
    openInfoDialog(user: User): void {
        const dialogRef = this.dialog.open(UserInfoDialogComponent, {
            width: '500px',
            data: user,
            autoFocus: false
        });
    }

    color(user: User): string {
        if (user.bookList.some(book => book.expired === true)) {
            return '#ff8a78';
        }
    }

    // уведомления
    private notification(type: string, message: string): void {
        $.notify({
            message: `<span style="font-size: 17px">${message}</span>`
        }, {
            type: type,
            timer: 500,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
}
