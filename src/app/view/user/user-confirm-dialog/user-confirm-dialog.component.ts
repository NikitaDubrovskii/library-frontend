import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../model/user";
import {UserService} from "../../../data/impl/user.service";

@Component({
  selector: 'app-user-confirm-dialog',
  templateUrl: './user-confirm-dialog.component.html',
  styleUrls: ['./user-confirm-dialog.component.scss']
})
export class UserConfirmDialogComponent implements OnInit {

  user: User;

  constructor(private dialogRef: MatDialogRef<UserConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: User,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.data;
  }

  confirm(): void {
    this.userService.delete(this.user.id).subscribe((user) => {
      this.dialogRef.close(user);
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
