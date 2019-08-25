import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {LoaderService} from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor  {

  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(
      map(event => {
        // this.loaderService.showLoader();

        return event;
      }),

      finalize(() => {

        this.loaderService.hide();

      }));
  }
}
