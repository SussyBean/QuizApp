import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrls: ['./pop-up-dialog.component.css']
})
export class PopUpDialogComponent implements OnInit {

  title: string;
  message: string;

constructor(public dialogRef: MatDialogRef<PopUpDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: PopUpDialogModel){
    this.title = data.title;
    this.message = data.message;
  }
  ngOnInit() {}

    onDismiss(): void {
      this.dialogRef.close(false);
    }


}

export class PopUpDialogModel {
  constructor(public title: string, public message: string) {
  }
}




