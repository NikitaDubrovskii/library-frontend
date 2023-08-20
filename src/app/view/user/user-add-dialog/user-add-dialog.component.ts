import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../data/impl/user.service";

@Component({
    selector: 'app-user-add-dialog',
    templateUrl: './user-add-dialog.component.html',
    styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent implements OnInit {

    user: User = new User(null, '', '', '');
    firstName: string;
    secondName: string;
    email: string;

    constructor(private dialogRef: MatDialogRef<UserAddDialogComponent>,
                private userService: UserService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    save(): void {
        this.user.firstName = this.firstName;
        this.user.secondName = this.secondName;
        this.user.email = this.email;

        this.userService.add(this.user).subscribe((savedUser) => {
            console.log("Книга сохранена");
            this.dialogRef.close(savedUser);
        })
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
