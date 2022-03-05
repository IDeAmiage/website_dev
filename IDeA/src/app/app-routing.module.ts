import { EntrepriseComponent } from './entreprise/entreprise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OpendataComponent } from './opendata/opendata.component';

const routes: Routes = [
  {path:'', component: OpendataComponent},
  {path:'opendata', component: OpendataComponent},
  {path:'entreprise', component: EntrepriseComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
