import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component'

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'movies', component: DashboardComponent},
  {path: 'series', component: DashboardComponent},
  {path: 'favoritos', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
