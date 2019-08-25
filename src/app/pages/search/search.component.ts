import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';
import {Language} from '../../models/language';
import {AdditionalList} from '../../models/additionalList';
import {environment} from '../../../environments/environment';
import {LoaderService} from '../../services/loader.service';
import {SharedService} from '../../services/shared.service';
import {HttpMessageComponent} from '../dialogs/http-message/http-message.component';
import {MatDialog} from '@angular/material';

declare var Typewriter: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  additionalList: AdditionalList[] = [
    {name: 'Semantically similar words', apiName: 'SEMANTICALLY_SIMILAR_WORDS'},
    {name: 'Association', apiName: 'ASSOCIATIONS'},
    {name: 'Ends with words', apiName: 'ENDS_WITH_WORDS'},
    {name: 'Left side neighbours', apiName: 'LEFT_SIDE_NEIGHBOURS'},
    {name: 'Ngrams', apiName: 'NGRAMS'},
    {name: 'Right side neighbours', apiName: 'RIGHT_SIDE_NEIGHBOURS'},
    {name: 'Semantically similar word filaments', apiName: 'SEMANTICALLY_SIMILAR_WORD_FILAMENTS'},
    {name: 'Starts with words', apiName: 'STARTS_WITH_WORDS'},
    {name: 'String similar words', apiName: 'STRING_SIMILAR_WORDS'},
    {name: 'Topical filaments', apiName: 'TOPICAL_FILAMENTS'},
  ];


  languageList: Language[] | Language;
  filteredOptions: Observable<Language[]>;

  searchForm = this.fb.group({
    searchWord: [''],
    searchLanguage: [''],
    searchAssociation: [''],
  });
  public submitted = false;
  isLoading = false;

  constructor(private httpService: HttpService,
              private fb: FormBuilder,
              private loaderService: LoaderService,
              private sharedService: SharedService,
              public dialog: MatDialog,) {

  }

  get searchWord() {
    return this.searchForm.get('searchWord');
  }

  get searchLanguage() {
    return this.searchForm.get('searchLanguage');
  }

  get searchAssociation() {
    return this.searchForm.get('searchAssociation');
  }


  displayFn(lang?: Language): string | undefined {
    return lang ? lang.name + ' - ' + lang.code : undefined;
  }

  makeAdditionalArgument(array) {
    let additionalString = '';
    array.forEach((key, index) => {
      additionalString += key + '&';
    });
    return additionalString;
  }


  // Get data from server
  onSubmit() {
    if (this.searchWord.value !== '' && this.searchLanguage.value !== '' && this.searchAssociation.value !== '') {
      this.isLoading = true;

      const lang = this.searchLanguage.value.code ? this.searchLanguage.value.code.toLowerCase() : this.searchLanguage.value.toLowerCase();
      // const lang = 'en';
      const word = this.searchWord.value;
      // const word = 'home';
      const additional = this.makeAdditionalArgument(this.searchAssociation.value);
      // const additional = 'SEMANTICALLY_SIMILAR_WORDS';
      // const additional = ['ASSOCIATIONS' 'SEMANTICALLY_SIMILAR_WORDS'];

      const searchUrl = `/lexicon/${lang.trim()}/${word.trim()}?apiKey=${environment.apiKey}&additionalFields=${additional}`;
      this.httpService.getDataJsonp({url: searchUrl}).subscribe((res: any) => {

          if (res.semanticallySimilarWords.length > 0) {
            this.sharedService.setDataSource({res, searchWord: this.searchWord.value});
          } else {
            this.sharedService.setDataSource({res: null, searchWord: this.searchWord.value})
            this.openMessageDialog();

          }

          this.isLoading = !this.isLoading;
        },
        error => {
          this.isLoading = !this.isLoading;
          this.sharedService.setDataSource({res: null, searchWord: this.searchWord.value})
          this.openMessageDialog();
        });
    }
  }

  startAnimation() {
    return new Typewriter('#demo', {
      strings: ['your favorite', 'word'],
      autoStart: true,
      loop: true,
    });
  }

  getLanguages() {
    this.httpService.getLanguage<Language>({url: 'assets/languages/lang.json'}).subscribe((res) => {
      this.languageList = res;

      this.filteredOptions = this.searchLanguage.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : (this.languageList as any).slice())
        );
    });
  }

  openMessageDialog() {
    this.dialog.open(HttpMessageComponent, {
      panelClass: 'search'
    });
  }

  ngOnInit() {
    this.startAnimation();
    this.getLanguages();
  }

  private _filter(name: string): Language[] {
    const filterValue = name.toLowerCase();

    return (this.languageList as any).filter(option => option.code.toLowerCase().indexOf(filterValue) === 0);
  }


}
