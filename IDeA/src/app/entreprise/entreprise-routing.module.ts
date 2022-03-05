import { OpendataComponent } from './components/opendata/opendata.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { HomeComponent } from './components/home/home.component';
import { EntrepriseComponent } from './entreprise.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'entreprise', component: EntrepriseComponent, children:[
      {path:'', component:HomeComponent},
      {path:'home', component:HomeComponent},
      {path:'covoiturage', component:CovoiturageComponent},
      {path:'opendata', component:OpendataComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
