import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  NbThemeModule,
  NbLayoutModule,
  NbFormFieldModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbAlertModule,
  NbSpinnerModule,
  NbSelectModule,
  NbToggleModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule } from '@nebular/auth';

import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleComponent } from './components/articles-list/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersComponent } from './components/users/users.component';
import { NasaComponent } from './components/nasa/nasa.component';
import { StarWarsComponent } from './components/star-wars/star-wars.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { ApiInterceptor } from './services/api/api-interceptor';
import { ApiService } from './services/api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    NasaComponent,
    StarWarsComponent,
    UsersTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbAuthModule,
    NbAlertModule,
    HttpClientModule,
    NgxPaginationModule,
    NbSpinnerModule,
    ScrollingModule,
    NbSelectModule,
    NbToggleModule
  ],
  providers: [
    ApiService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
