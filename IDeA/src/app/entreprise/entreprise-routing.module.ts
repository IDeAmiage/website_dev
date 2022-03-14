import { ConferencesComponent } from './components/conferences/conferences.component';
import { SportComponent } from './components/sport/sport.component';
import { FoodTrucksComponent } from './components/food-trucks/food-trucks.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { OpendataComponent } from './components/opendata/opendata.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { HomeComponent } from './components/home/home.component';
import { EntrepriseComponent } from './entreprise.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
// const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    path: 'entreprise', component: EntrepriseComponent, children:[
      {path:'', component:HomeComponent},
      {path:'home', component:HomeComponent},
      {path:'covoiturage', component:CovoiturageComponent},
      {path:'opendata', component:OpendataComponent},
      {path:'opendata/table', component:TableViewComponent},
      {path:'foodtrucks', component: FoodTrucksComponent},
      {path:'sport', component: SportComponent},
      {path:'conferences', component: ConferencesComponent}

    ],
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
