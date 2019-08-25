import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ResultTableComponent} from '../../result-table/result-table.component';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoreInfoComponent implements OnInit {
  objectKeys = Object.keys;
  wordInformation;

  constructor(public dialogRef: MatDialogRef<ResultTableComponent>,
              @Inject(MAT_DIALOG_DATA) public moreInfoData: any) {

  }

  ngOnInit() {
    this.wordInformation = this.moreInfoData.res.wordInformation ? this.moreInfoData.res.wordInformation : {sorry : 'we hav not any information'};
  }

}
