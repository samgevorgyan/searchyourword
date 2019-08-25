import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  searchResult;

  searchResultChange: Subject<string> = new Subject<string>();
  constructor() { }

  setDataSource(arg) {
    this.searchResult = arg;
    this.searchResultChange.next(this.searchResult);

  }
}
