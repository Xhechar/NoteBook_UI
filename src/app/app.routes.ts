import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotebookComponent } from './components/notebook/notebook.component';

export const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'user', component: NotebookComponent}
];
