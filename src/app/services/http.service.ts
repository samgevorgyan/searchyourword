import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient) {

  }


  getLanguage<T>(model: T | any): Observable<T | T[]> {
    return this.http.get<T | T[]>(`${model.url}`);
  }

  getDataJsonp<T>(model: T | any): Observable<T | T[]> {
    return this.http.jsonp<T | T[]>(` ${environment.api_url}${model.url}`, 'callback');
  }
}
