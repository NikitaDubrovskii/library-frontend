import {AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../data/impl/book.service";

import {MatDialog} from "@angular/material/dialog";
import {BookEditDialogComponent} from "./book-edit-dialog/book-edit-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {BookAddDialogComponent} from "./book-add-dialog/book-add-dialog.component";
import {BookConfirmDialogComponent} from "./book-confirm-dialog/book-confirm-dialog.component";
import {BookGiveDialogComponent} from "./book-give-dialog/book-give-dialog.component";
import {BookInfoDialogComponent} from "./book-info-dialog/book-info-dialog.component";

declare var $: any;

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['color', 'number', 'title', 'author', 'page', 'id', 'options'];
    dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    books: Book[] = [];
    bookId: number;

    constructor(private bookService: BookService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fillTable();
    }

    // заполнение таблицы книгами из БД
    fillTable() {
        this.bookService.getAll().subscribe(res => {
            this.dataSource.data = res;
        })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // цвет для занятой книги
    color(book: Book) {
        if (book.taken === true) {
            return '#ff8a78'
        }
    }

    // проверяет занята ли книга
    isTaken(book: Book): boolean {
        return book.taken;
    }


    // фильтр поиска по любым критериям
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    // при нажатии на строку в таблице открывается выбранная книга
    openEditDialog(book: Book): void {
        const dialogRef = this.dialog.open(BookEditDialogComponent, {
            width: '500px',
            data: book,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe((updatedBook) => {
            if (updatedBook) {
                this.notification('success', `Книга <b>${updatedBook.title}</b> обновлена!`)
            } else {
                this.notification('warning', `Обновление книги было отменено!`)
            }
        })
    }

    // открытие окна добавления книги
    openAddDialog(): void {
        const dialogRef = this.dialog.open(BookAddDialogComponent, {
            width: '500px',
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe((savedBook) => {
            if (savedBook) {
                this.notification('success', `Книга <b>${savedBook.title}</b> добавлена!`)
                this.fillTable();
            } else {
                this.notification('warning', `Добавление книги было отменено!`)
            }
        })
    }

    // открытие окна подтверждения удаления книги
    openConfirmDialog(book: Book): void {
        const dialogRef = this.dialog.open(BookConfirmDialogComponent, {
            width: '500px',
            data: book,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe((deletedBook) => {
            if (deletedBook) {
                this.notification('success', `Книга <b>${deletedBook.title}</b> удалена!`)
                this.fillTable();
            } else {
                this.notification('warning', `Удаление книги было отменено!`)
            }
        })
    }

    // открытие окна выдачи книги пользователю
    openGiveDialog(book: Book): void {
        const dialogRef = this.dialog.open(BookGiveDialogComponent, {
            width: '500px',
            data: book,
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(({book, name, message}) => {
            if (book) {
                if (message === 'give') {
                    this.notification('success', `Книга <b>${book.title}</b> выдана читателю ${name}!`)
                } else {
                    this.notification('success', `Книга <b>${book.title}</b> читателя ${name} возвращена!`)
                }
                this.fillTable();
            } else {
                if (message === 'give') {
                    this.notification('warning', `Выдача книги была отменена!`)
                } else {
                    this.notification('warning', `Возвтрат книги был отменен!`)
                }
            }
        })
    }

    // открыть окно информации
    openInfoDialog(book: Book): void {
        const dialogRef = this.dialog.open(BookInfoDialogComponent, {
            width: '500px',
            data: book,
            autoFocus: false
        });
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
