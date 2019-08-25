import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SharedService} from '../../services/shared.service';
import {Subscription} from 'rxjs';
import {MoreInfoComponent} from '../dialogs/more-info/more-info.component';
import {MatDialog} from '@angular/material';

export interface WordData {
  word: string;
  forWord: string;
  strength: string;
}


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],

})
export class ResultTableComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['word', 'forWord', 'strength'];
  dataSource: MatTableDataSource<WordData>;
  resultSubscribe: Subscription;
  public searchResult;
  public searchWord = 'd';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private sharedService: SharedService,
              public dialog: MatDialog,) {


  }

  setDataSource() {
    if (this.searchResult.res) {
      this.dataSource = new MatTableDataSource(this.searchResult.res.semanticallySimilarWords);
      this.searchWord = this.searchResult.searchWord;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openMoreInfoDialog(data) {
    this.dialog.open(MoreInfoComponent, {

      data,
      panelClass: 'moreInfo'
    });
  }

  showMoreInfo() {

    this.openMoreInfoDialog(this.searchResult);
  }

  ngOnInit() {

    this.resultSubscribe = this.sharedService.searchResultChange.subscribe((value) => {
      this.searchResult = value;
      this.setDataSource();
    });

  }

  ngOnDestroy() {
    this.resultSubscribe.unsubscribe();
  }
}
