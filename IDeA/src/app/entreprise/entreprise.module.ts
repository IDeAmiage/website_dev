import { MonEntrepriseComponent } from './components/mon-entreprise/mon-entreprise.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostCovoiturageComponent } from './components/post-covoiturage/post-covoiturage.component';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InterceptorService } from '../interceptor.service';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AtomSpinnerModule } from 'angular-epic-spinners';




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
    NavComponent,
    PostCovoiturageComponent,
    ProfileComponent,
    EditProfileComponent,
    MonEntrepriseComponent
  ],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    AtomSpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}]
})
export class EntrepriseModule { }
