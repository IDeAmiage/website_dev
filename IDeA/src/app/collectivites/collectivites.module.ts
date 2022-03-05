import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectivitesRoutingModule } from './collectivites-routing.module';
import { HomeCollectivitesComponent } from './components/home-collectivites/home-collectivites.component';
import { CollectivitesComponent } from './collectivites.component';


@NgModule({
  declarations: [
    HomeCollectivitesComponent,
    CollectivitesComponent
  ],
  imports: [
    CommonModule,
    CollectivitesRoutingModule
  ]
})
export class CollectivitesModule { }
