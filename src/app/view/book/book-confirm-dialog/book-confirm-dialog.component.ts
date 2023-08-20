import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../model/book";
import {BookService} from "../../../data/impl/book.service";

@Component({
    selector: 'app-book-confirm-dialog',
    templateUrl: './book-confirm-dialog.component.html',
    styleUrls: ['./book-confirm-dialog.component.scss']
})
export class BookConfirmDialogComponent implements OnInit {

    book: Book;

    constructor(private dialogRef: MatDialogRef<BookConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private data: Book,
                private bookService: BookService) {
    }

    ngOnInit(): void {
        this.book = this.data;
    }

    confirm(): void {
        this.bookService.delete(this.book.id).subscribe((book) => {
            this.dialogRef.close(book);
        })
    }

    cancel(): void {
        this.dialogRef.close();
    }

}
