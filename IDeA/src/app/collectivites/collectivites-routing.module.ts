import { HomeCollectivitesComponent } from './components/home-collectivites/home-collectivites.component';
import { CollectivitesComponent } from './collectivites.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'collectivites', component: CollectivitesComponent, children:[
      {path:'', component:HomeCollectivitesComponent},
      {path:'home', component:HomeCollectivitesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectivitesRoutingModule { }
