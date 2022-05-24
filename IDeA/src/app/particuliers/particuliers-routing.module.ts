import { HomeParticuliersComponent } from './components/home-particuliers/home-particuliers.component';
import { ParticuliersComponent } from './particuliers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'particuliers', component: ParticuliersComponent, children:[
      {path:'', component:HomeParticuliersComponent},
      {path:'home', component:HomeParticuliersComponent}
    ]
  }
];
/**
 * Submodule of routing for Particuliers user group
 *
 * @export
 * @class ParticuliersRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticuliersRoutingModule { }
