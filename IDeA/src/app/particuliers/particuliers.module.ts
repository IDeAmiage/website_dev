import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticuliersRoutingModule } from './particuliers-routing.module';
import { HomeParticuliersComponent } from './components/home-particuliers/home-particuliers.component';
import { ParticuliersComponent } from './particuliers.component';


@NgModule({
  declarations: [
    HomeParticuliersComponent,
    ParticuliersComponent
  ],
  imports: [
    CommonModule,
    ParticuliersRoutingModule
  ]
})
export class ParticuliersModule { }
