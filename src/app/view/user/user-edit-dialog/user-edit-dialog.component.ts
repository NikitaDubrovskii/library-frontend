import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../data/impl/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Book} from "../../../model/book";

declare var $: any;

@Component({
    selector: 'app-user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

    user: User;
    firstName: string;
    secondName: string;
    email: string;

    // для отображения книг у читателя (если имеются)
    displayedColumns: string[] = ['color', 'number', 'title', 'author', 'id'];
    dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();

    constructor(private dialogRef: MatDialogRef<UserEditDialogComponent>,
                @Inject(MAT_DIALOG_DATA) private data: User,
                private userService: UserService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.user = this.data;
        this.firstName = this.user.firstName;
        this.secondName = this.user.secondName;
        this.email = this.user.email;

        //this.findBooks();
    }

    save(): void {
        this.user.firstName = this.firstName;
        this.user.secondName = this.secondName;
        this.user.email = this.email;

        this.user.bookList = this.dataSource.data;

        this.userService.update(this.user.id, this.user).subscribe((savedUser) => {
            console.log("Пользователь обновлен!");
            this.dialogRef.close(savedUser);
        })
    }

    cancel(): void {
        this.dialogRef.close();
    }

    isExpired(book: Book) {
        if (book.expired) {
            return '#ff8a78';
        }
    }


    private findBooks(): void {
        if (this.user.bookList.length > 0) {
            this.dataSource.data = this.user.bookList;
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
