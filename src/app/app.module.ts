import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ArticlesListComponent } from './articles-list/articles-list.component'
import { ArticleComponent } from './articles-list/article/article.component'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import {
  NbThemeModule,
  NbLayoutModule,
  NbFormFieldModule,
  NbIconModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule, NbAlertModule
} from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbAuthModule } from "@nebular/auth"

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    NotFoundComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
