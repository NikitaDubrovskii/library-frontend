import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../model/book";
import {BookService} from "../../../data/impl/book.service";

@Component({
  selector: 'app-book-info-dialog',
  templateUrl: './book-info-dialog.component.html',
  styleUrls: ['./book-info-dialog.component.scss']
})
export class BookInfoDialogComponent implements OnInit {

  book: Book;

  constructor(private dialogRef: MatDialogRef<BookInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Book,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.book = this.data;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
