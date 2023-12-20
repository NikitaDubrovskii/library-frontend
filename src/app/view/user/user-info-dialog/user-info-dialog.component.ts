import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../model/user";

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent implements OnInit {

  user: User;

  constructor(private dialogRef: MatDialogRef<UserInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: User) { }

  ngOnInit(): void {
    this.user = this.data;
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
