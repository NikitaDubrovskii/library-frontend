import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../model/book";
import {BookService} from "../../../data/impl/book.service";

@Component({
    selector: 'app-book-add-dialog',
    templateUrl: './book-add-dialog.component.html',
    styleUrls: ['./book-add-dialog.component.scss']
})
export class BookAddDialogComponent implements OnInit {

    book: Book = new Book(null, '', '');
    title: string;
    author: string;
    page: number;

    constructor(private dialogRef: MatDialogRef<BookAddDialogComponent>,
                private bookService: BookService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    save(): void {
        this.book.title = this.title;
        this.book.author = this.author;
        this.book.page = this.page;

        this.bookService.add(this.book).subscribe((savedBook) => {
            console.log("Книга сохранена");
            this.dialogRef.close(savedBook);
        })
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
