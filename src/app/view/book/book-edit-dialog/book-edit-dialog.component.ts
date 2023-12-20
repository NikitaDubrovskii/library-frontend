import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../model/book";
import {BookService} from "../../../data/impl/book.service";
import {User} from "../../../model/user";

@Component({
    selector: 'app-book-edit-dialog',
    templateUrl: './book-edit-dialog.component.html',
    styleUrls: ['./book-edit-dialog.component.scss']
})
export class BookEditDialogComponent implements OnInit {

    book: Book;
    user: User;
    title: string;
    author: string;
    page: number;

    reader: string = '';

    constructor(private dialogRef: MatDialogRef<BookEditDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private data: Book,
                private bookService: BookService) {
    }

    ngOnInit() {
        this.book = this.data;
        this.title = this.book.title;
        this.author = this.book.author;
        this.page = this.book.page;

        this.findReader();
    }

    save(): void {
        this.book.title = this.title;
        this.book.author = this.author;
        this.book.page = this.page;

        this.bookService.update(this.book.id, this.book).subscribe((savedBook) => {
            console.log("Книга сохранена!");
            this.dialogRef.close(savedBook);
        })
    }

    cancel(): void {
        this.dialogRef.close();
    }

    // пишет пользователя, у которого находится книга
    private findReader() {
        this.user = this.book.userId;

        if (this.user) {
            this.reader = this.user.firstName + ' ' + this.user.secondName;
        } else {
            this.reader = ' ';
        }
    }
}
