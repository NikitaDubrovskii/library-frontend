import {Component, Inject, OnInit} from '@angular/core';
import {Book} from "../../../model/book";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BookService} from "../../../data/impl/book.service";
import {User} from "../../../model/user";
import {UserService} from "../../../data/impl/user.service";

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {

  user: User;

  constructor(private dialogRef: MatDialogRef<UserInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: User,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.data;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
