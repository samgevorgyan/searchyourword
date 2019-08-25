import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {AppRoutingModule} from './app-routing.module';


import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './pages/header/header.component';
import {FooterComponent} from './pages/footer/footer.component';
import {SearchComponent} from './pages/search/search.component';
import {ResultTableComponent} from './pages/result-table/result-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule, JsonpClientBackend} from '@angular/common/http';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {LoaderService} from './services/loader.service';
import {HttpService} from './services/http.service';
import { LaoderComponent } from './pages/laoder/laoder.component';
import { HttpMessageComponent } from './pages/dialogs/http-message/http-message.component';
import { MoreInfoComponent } from './pages/dialogs/more-info/more-info.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    ResultTableComponent,
    LaoderComponent,
    HttpMessageComponent,
    MoreInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,

  ],
  entryComponents: [
    HttpMessageComponent,
    MoreInfoComponent

  ],
  providers: [
    LoaderService,
    HttpService,
    JsonpClientBackend,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
