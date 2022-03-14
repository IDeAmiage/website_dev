import { NavComponent } from './components/nav/nav.component';
import { SportComponent } from './components/sport/sport.component';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { FoodTrucksComponent } from './components/food-trucks/food-trucks.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CovoiturageComponent } from './components/covoiturage/covoiturage.component';
import { EntrepriseComponent } from './entreprise.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { OpendataComponent } from './components/opendata/opendata.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    HomeComponent,
    CovoiturageComponent,
    EntrepriseComponent,
    OpendataComponent,
    TableViewComponent,
    FoodTrucksComponent,
    ConferencesComponent,
    SportComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class EntrepriseModule { }
