import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsersComponent } from './components/users/users.component';
import { NasaComponent } from './components/nasa/nasa.component';
import { StarWarsComponent } from './components/star-wars/star-wars.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { BlogComponent } from './components/blog/blog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'nasa', component: NasaComponent },
  { path: 'star-wars', component: StarWarsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'users', component: UsersComponent, children: [{ path: 'page/:id', component: UsersTableComponent }] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
