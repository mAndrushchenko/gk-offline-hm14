import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArticlesListComponent } from "./articles-list/articles-list.component"
import { LoginComponent } from "./login/login.component"
import { RegistrationComponent } from "./registration/registration.component"
import { HomeComponent } from "./home/home.component"
import { NotFoundComponent } from "./not-found/not-found.component"

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'articles', component: ArticlesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
