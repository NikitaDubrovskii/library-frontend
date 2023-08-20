import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../model/book";
import {BookService} from "../../../data/impl/book.service";
import {User} from "../../../model/user";
import {UserService} from "../../../data/impl/user.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
    selector: 'app-book-give-dialog',
    templateUrl: './book-give-dialog.component.html',
    styleUrls: ['./book-give-dialog.component.scss']
})
export class BookGiveDialogComponent implements OnInit {

    book: Book;
    user: User;
    users: User[];
    selectedUser: User | null = null;
    reader: string = '';

    myControl = new FormControl('');
    filteredUsers: Observable<User[]>

    constructor(private dialogRef: MatDialogRef<BookGiveDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private data: Book,
                private bookService: BookService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.book = this.data;

        this.userService.getAll().subscribe(users => {
            this.users = users;
            this.users.forEach(user => {
                user.fullName = user.firstName + ' ' + user.secondName;
            });

            this.filteredUsers = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => this.filter(value || ''))
            );
        });

        this.findReader();
    }

    // при выборе пользователя он записывается в переменную
    onUserSelected(user: User) {
        this.selectedUser = user;
    }

    // проверяет, взята ли книга
    isTaken(): boolean {
        return this.book.taken;
    }

    give(): void {
        this.bookService.giveBook(this.book.id, this.selectedUser.id).subscribe((book) => {
            let name = this.selectedUser.firstName + ' ' + this.selectedUser.secondName;
            let message = 'give';
            this.dialogRef.close({book, name, message});
        })
    }

    take(): void {
        this.bookService.takeBook(this.book.id).subscribe((book) => {
            let name = this.user.firstName + ' ' + this.user.secondName;
            let message = 'take';
            this.dialogRef.close({book, name, message});
        })
    }

    cancel(): void {
        this.dialogRef.close();
    }

    // фильтр по имени, фамилии и айди
    private filter(value: string): User[] {
        const filterValue = value.toLowerCase();
        return this.users.filter(user => user.firstName.toLowerCase().includes(filterValue) || user.secondName.toLowerCase().includes(filterValue) || user.id.toString().includes(value));
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
